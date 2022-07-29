import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { User } from "../models/User";

const initialState: { user?: User } = { user: undefined };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;

            state.user = user;
        },
        // removeProduct: (state, action: PayloadAction<Product>) => {
        //   const product = action.payload;
        //   state.products = state.products.filter((p) => p.id != product.id);
        //   state.total -= product.price;
        // },
        // clearCart: (state) => {
        //   state.products = [];
        //   state.total = 0;
        // },
    },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
