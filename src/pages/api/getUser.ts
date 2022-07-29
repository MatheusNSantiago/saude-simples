import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../models/User";
import UserModel from "../../server/models/User";
import { connectMongo } from "../../server/connectMongo";

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    await connectMongo();

    const userDoc = await UserModel.findOne({ cpf: req.query.cpf });

    if (userDoc) {
        return res.status(200).send(userDoc.toObject());
    }

    return res.status(500).send(null);
};

export default getUser;