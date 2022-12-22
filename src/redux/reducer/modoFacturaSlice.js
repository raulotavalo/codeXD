import {createSlice} from "@reduxjs/toolkit";

export const modoFacturaSlice = createSlice({
    name:'modoFactura',
    initialState:{
        modo:null
    },
    reducers:{
        modoFactura: (state, action)=>{
            state.user=action.payload;
        }
    }

});

export const {modoFactura}=modoFacturaSlice.actions;
export const selectModoFactura = (state) => state.modoFactura.modoFactura;
export default modoFacturaSlice.reducer;