import { Schema, model, models, Model } from "mongoose";
import { ExameGroup, ExameName } from "../../models/Exame";

export interface IExame {
    group: ExameGroup;
    name: ExameName<ExameGroup>;
    value: { type: Number; required: true };
    date: { type: Date; required: true };
}

export const ExameSchema = new Schema<IExame>({
    group: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, required: true },
});

export default (models.Exame as Model<IExame>) || model("Exame", ExameSchema);
