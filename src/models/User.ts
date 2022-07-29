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

    static getFakeUser() {
        return new User(
            "Pessoa",
            "12345678901",
            new Date(1971, 1, 1),
            [
                new Exame(
                    "bio-impedancia",
                    "Massa Magra",
                    30,
                    new Date(2020, 1, 1)
                ),
                new Exame(
                    "bio-impedancia",
                    "Massa Gorda",
                    15,
                    new Date(2020, 1, 1)
                ),
                new Exame(
                    "bio-impedancia",
                    "Massa Muscular",
                    20,
                    new Date(2020, 1, 1)
                ),
            ],
            167,
            "email@email.com",
            "https://randomuser.me/api/portraits/women/0.jpg"
        );
    }
}
