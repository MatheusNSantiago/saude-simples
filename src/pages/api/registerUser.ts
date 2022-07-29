import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../models/User";
import UserModel from "../../server/models/User";
import { connectMongo } from "../../server/connectMongo";

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();
    // const { nome, cpf, nascimento, altura, exames, email, foto } = req.body;

    const body = req.body;

    if (req.method === "POST") {
        const userDoc = await UserModel.findOne({ cpf: body.cpf });

        console.log(userDoc);

        if (userDoc) {
            return res.status(500).send("CPF já cadastrado");
        }

        const user = await UserModel.create(body);

        return res.status(200).send(user.toObject());
    }
};
export default registerUser;