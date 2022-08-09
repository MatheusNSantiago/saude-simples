import * as examesInfo from "../exames.json";

export type ExameGroup = keyof typeof examesInfo;
export type ExameName<Group extends ExameGroup> = Group extends ExameGroup
    ? keyof typeof examesInfo[Group]
    : ExameName<ExameGroup>;

export interface IExame {
    group: ExameGroup;
    name: ExameName<ExameGroup>;
    value: number;
    date: Date;
}

export class Exame<
    Group extends ExameGroup = ExameGroup,
    Name extends ExameName<Group> = ExameName<Group>
> implements IExame
{
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

    static getNamesForGroup = (group: ExameGroup) =>
        Object.keys(examesInfo[group]);

    static getMostRecentExamesForGroup = (
        exames: Exame[],
        group: ExameGroup
    ) => {
        const examesGrupo = exames
            .filter((exame) => exame.group === group)
            .sort((a, b) => b.date.getTime() - a.date.getTime());

        const examesMaisNovos: Exame[] = [];

        Exame.getNamesForGroup(group).forEach((exameName) => {
            const exame: Exame | undefined = examesGrupo.filter(
                (exame) => exame.name === exameName
            )[0];

            if (exame) examesMaisNovos.push(exame);
        });

        return examesMaisNovos;
    };
}
