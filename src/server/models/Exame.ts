import { Schema, model, models, Model } from "mongoose";
import { Exame } from "../../models/Exame";

export const ExameSchema = new Schema<Exame>({
    group: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, required: true },
});

export default (models.Exame as Model<Exame>) || model("Exame", ExameSchema);
