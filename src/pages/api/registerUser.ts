import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../models/User";
import UserModel from "../../server/models/User";
import { connectMongo } from "../../server/connectMongo";
import { AxiosError } from "axios";

const registerUser = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();

    const body = req.body;

    if (req.method === "POST") {
        /* Confere se o usuário já esta cadastrado */
        const userDoc = await UserModel.findOne({ cpf: body.cpf });
        if (userDoc) return res.status(400).send("CPF já cadastrado");

        UserModel.create(body)
            .then((user) => {
                return res.status(200).send(user.toObject());
            })
            .catch((err) => {
                if (err.name === "ValidationError")
                    return res.status(400).send("ValidationError");

                return res.status(500).send("Erro no servidor");
            });
    }
};
export default registerUser;
