import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../models/User";
import UserModel from "../../server/models/User";
import { connectMongo } from "../../server/connectMongo";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default async (req: NextApiRequest, res: NextApiResponse<User>) => {
    await connectMongo();

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    if (req.method === "POST") {
        const userDoc = await UserModel.findOne({ cpf: req.body.cpf });

        if (userDoc) {
            await userDoc.update(req.body);
            await userDoc.save();

            return res.status(200);
        }

        return res.status(500);
    }
};
