import { Schema, model, models, Model } from "mongoose";
import { User } from "../../models/User";
import { ExameSchema } from "./Exame";


const UserSchema = new Schema<User>({
    cpf: { type: String, required: true, unique: true },
    nome: { type: String, required: true },
    nascimento: { type: Date, required: true },
    altura: { type: Number, required: true },
    exames: [ExameSchema],
    email: String,
    foto: String,
});

export default (models.User as Model<User>) || model("User", UserSchema);
