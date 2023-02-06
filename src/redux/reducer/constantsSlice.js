import {createSlice} from "@reduxjs/toolkit";

export const constantsSlice = createSlice({
    name:'constants',
    initialState:{
        constants:null
    },
    reducers:{
        constants: (state, action)=>{
            state.constants=action.payload;
        },
    }
});

export const {constants}=constantsSlice.actions;
export const getConstants = (state) => state.constants.constants;
export default constantsSlice.reducer;