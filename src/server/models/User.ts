import { Schema, model, models, Model } from "mongoose";
import { IExame } from "../../models/Exame";
import { ExameSchema } from "./Exame";

export interface IUser {
    cpf: string;
    nome: string;
    nascimento: Date;
    altura: number;
    exames: [IExame];
    email: string;
    foto: string;
}

const UserSchema = new Schema<IUser>({
    cpf: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    nascimento: { type: Date, required: true },
    altura: { type: Number, required: true },
    exames: [ExameSchema],
    email: String,
    foto: String,
});

export default (models.User as Model<IUser>) || model("User", UserSchema);
