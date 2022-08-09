import { Exame, ExameGroup } from "./Exame";

export class User {
    nome: string;
    cpf: string;
    nascimento: Date;
    altura: number;
    exames: Exame[];
    email?: string;
    foto?: string;

    constructor(
        nome: string,
        cpf: string,
        nascimento: Date,
        exames: Exame[] = [],
        altura: number,
        email?: string,
        foto?: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.nascimento = nascimento;
        this.email = email;
        this.foto = foto;
        this.altura = altura;
        this.exames = exames;
    }

    public get idade(): number {
        const nasc = this.nascimento;
        const today = new Date();

        let idade = today.getFullYear() - nasc.getFullYear();

        if (today.getMonth() < nasc.getMonth()) idade--;
        if (
            today.getMonth() == nasc.getMonth() &&
            today.getDay() < nasc.getDay()
        )
            idade--;

        return idade;
    }

    getExamesFromGroup(group: ExameGroup) {
        return this.exames.filter((exame) => exame.group == group);
    }

}
