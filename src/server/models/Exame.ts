import { Schema } from "mongoose";
import { IExame } from "../../models/Exame";

export const ExameSchema = new Schema<IExame>({
    group: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, default: Date.now() },
});
