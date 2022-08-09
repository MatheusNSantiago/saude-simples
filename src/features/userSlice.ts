import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Exame, IExame } from "../models/Exame";
import { User } from "../models/User";
import { IUser } from "../server/models/User";

const initialState: IUser = {
    nome: "",
    cpf: "",
    nascimento: Date.now(),
    altura: -1,
    exames: [],
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { nome, cpf, nascimento, altura, exames, email, foto } =
                action.payload;

            state.nome = nome;
            state.cpf = cpf;
            state.nascimento = Date.parse(nascimento);
            state.altura = altura;
            state.exames = exames.map(
                ({ group, name, value, date }: IExame) => {
                    return {
                        group: group,
                        name: name,
                        value: value,
                        date: date,
                    };
                }
            );
            state.email = email;
            state.foto = foto;
        },
        addExames: (state, action: PayloadAction<IExame[]>) => {
            const exames = action.payload.map(
                ({ group, name, value, date }) => {
                    return {
                        group,
                        name,
                        value,
                        date: date,
                    };
                }
            );

            state.exames = [...state.exames, ...exames];
        },
    },
});

export const { setUser, addExames } = userSlice.actions;

export const selectUser = ({ user }: RootState) => {
    if (user.nome === "") return undefined;

    return new User(
        user.nome,
        user.cpf,
        new Date(user.nascimento),
        user.exames.map(
            ({ group, name, value, date }) =>
                new Exame(group, name, value, new Date(date))
        ),
        user.altura,
        user.email,
        user.foto
    );
};

export default userSlice.reducer;
