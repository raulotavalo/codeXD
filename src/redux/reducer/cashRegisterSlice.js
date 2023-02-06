import {createSlice} from "@reduxjs/toolkit";

export const cashRegisterSlice = createSlice({
    name:'cashRegister',
    initialState:{
        cashRegister:null
    },
    reducers:{
        cashRegister: (state, action)=>{
            state.cashRegister=action.payload;
        },
    }
});

export const {cashRegister}=cashRegisterSlice.actions;
export const getCashRegister = (state) => state.cashRegister.cashRegister;
export default cashRegisterSlice.reducer;