import * as examesInfo from "../exames.json"

export type ExameGroup = keyof typeof examesInfo;
type ExameName<Group extends ExameGroup> = keyof typeof examesInfo[Group];

export class Exame<
    Group extends ExameGroup = ExameGroup,
    Name extends ExameName<Group> = ExameName<Group> extends never
        ? any
        : ExameName<Group>
> {
    group: Group;
    name: Name;
    value: number;
    date: Date;

    constructor(group: Group, name: Name, value: number, date: Date) {
        this.group = group;
        this.name = name;
        this.value = value;
        this.date = date;
    }

    public get faixa() {
        return (examesInfo[this.group][this.name] as any).faixa;
    }

    public get unidade() {
        return (examesInfo[this.group][this.name] as any).unidade;
    }

    toJson() {
        return {
            group: this.group,
            name: this.name,
            value: this.value,
            date: this.date,
        };
    }
}
