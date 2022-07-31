import * as examesInfo from "../exames.json";

export type ExameGroup = keyof typeof examesInfo;
export type ExameName<Group extends ExameGroup> = Group extends ExameGroup
    ? keyof typeof examesInfo[Group]
    : ExameName<ExameGroup>

export class Exame<
    Group extends ExameGroup = ExameGroup,
    Name extends ExameName<Group> = ExameName<Group>
> {
    group: Group;
    name: Name;
    value: number;
    date: Date;

    constructor(group: Group, name: Name, value: number, date = new Date()) {
        this.group = group;
        this.name = name;
        this.value = value;
        this.date = date;
    }

    public get faixa(): [min: number, max: number] {
        return (examesInfo as any)[this.group][this.name].faixa;
    }

    public get unidade() {
        return (examesInfo as any)[this.group][this.name].unidade;
    }
}
