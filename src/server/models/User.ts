import { Schema, model, models, Model } from "mongoose";
import { ExameSchema } from "./Exame";

export interface IUserModel {
    cpf: String;
    nome: String;
    nascimento: Date;
    altura: Number;
    exames: [];
    email: String;
    foto: String;
}

const UserSchema = new Schema<IUserModel>(
    {
        cpf: { type: String, required: true, unique: true },
        nome: { type: String, required: true },
        nascimento: { type: Date, required: true },
        altura: { type: Number, required: true },
        exames: [ExameSchema],
        email: String,
        foto: String,
    },
    {
        methods: {
            toBaseForm() {},
        },
    }
);

export default (models.User as Model<IUserModel>) || model("User", UserSchema);
