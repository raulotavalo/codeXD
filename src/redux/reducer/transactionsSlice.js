import {createSlice} from "@reduxjs/toolkit";

export const transactionSlice = createSlice({
    name:'transactionMod',
    initialState:{
        transactions:null
    },
    reducers:{
        transactionMod: (state, action)=>{
            state.transactions=action.payload;
        },
    }
});

export const {transactionMod}=transactionSlice.actions;
export const getTransaction = (state) => state.transactions.transactions;
export default transactionSlice.reducer;