import type { NextApiRequest, NextApiResponse } from "next";
import UserModel from "../../server/models/User";
import { connectMongo } from "../../server/connectMongo";
import { Exame, IExame } from "../../models/Exame";

const addExame = async (
    req: NextApiRequest,
    res: NextApiResponse<IExame[] | null>
) => {
    await connectMongo();

    const userDoc = await UserModel.findOne({ cpf: req.body.cpf });

    if (userDoc) {
        const exames = req.body.exames as IExame[];

        exames.forEach(({ group, name, value }) => {
            userDoc.exames.push({
                group: group,
                name: name,
                value: value,
            });
        });

        await userDoc.save();

        return res.status(200).json(
            userDoc.exames.map(({ group, name, value, date }): IExame => {
                return { group, name, value, date };
            })
        );
    }

    return res.status(500).send(null);
};

export default addExame;
