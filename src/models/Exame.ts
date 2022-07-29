const examesInfo = {
    "bio-impedancia": {
        "Massa Magra": { faixa: [10, 20], unidade: "KG" },
        "Massa Gorda": { faixa: [20, 30], unidade: "KG" },
        "Massa Muscular": { faixa: [10, 20], unidade: "KG" },
    },
    hemograma: {
        Hemácias: { faixa: [4.5, 6.1], unidade: "milhões/µL" },
        Hemoglobina: { faixa: [13, 16.5], unidade: "g/dL " },
        Hematócrito: { faixa: [36, 54], unidade: "%" },
        "Volume Corpuscular Médio (VCM)": { faixa: [80, 98], unidade: "fL" },
        "Hemoglobina Corpuscular Média (HCM)": {
            faixa: [27, 32],
            unidade: "pg",
        },
        "Concentração da Hemoglobina Corpuscular Média (CHCM)": {
            faixa: [30, 36.5],
            unidade: "g/dL",
        },
        "Amplitude de Distribuição dos Glóbulos Vermelhos (RDW)": {
            faixa: [11, 16],
            unidade: "%",
        },
        Leucócitos: { faixa: [4000, 11000], unidade: "µL" },
        Bastonetes: { faixa: [0, 800], unidade: "µL" },
        Segmentados: { faixa: [1600, 8000], unidade: "µL" },
        Linfócitos: { faixa: [900, 4000], unidade: "µL" },
        Monócitos: { faixa: [100, 1000], unidade: "µL" },
        Eosinófilos: { faixa: [0, 500], unidade: "µL" },
        Basófilos: { faixa: [0, 220], unidade: "µL" },
        Plaquetas: { faixa: [150000, 450000], unidade: "µL" },
    },
} ;

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
