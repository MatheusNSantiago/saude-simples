import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../server/models/User";
import { connectMongo } from "../../server/connectMongo";

const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();

    const { cpf, name, altura, email } = req.body;

    if (req.method === "PUT") {
        const userDoc = await UserModel.findOne({ cpf });

        if (userDoc) {
            userDoc.nome = name;
            userDoc.altura = altura;
            userDoc.email = email;

            await userDoc.save();
            return res.status(200).send("User updated");
        }
    }

    return res.status(500).send("Deu ruim");
};

export default updateUser;
