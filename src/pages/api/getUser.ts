import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../models/User";
import UserModel from "../../server/models/User";
import { connectMongo } from "../../server/connectMongo";

export default async (
    req: NextApiRequest,
    res: NextApiResponse<User | null>
) => {
    await connectMongo();

    const userDoc = await UserModel.findOne({ cpf: req.query.cpf });

    if (userDoc) {

        // console.log(userDoc.toObject({versionKey: true, useProjection: false}));

        return res.status(200).send(userDoc.toObject());
    }

    return res.status(500).send(null);
};
