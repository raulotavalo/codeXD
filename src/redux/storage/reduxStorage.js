import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/loginSlice";
import transactionReducer from "../reducer/transactionsSlice";
import constantsReducer from "../reducer/constantsSlice";
import salesOfficeReducer from "../reducer/cashRegisterSlice";
import modoFacturaReducer from "../reducer/modoFacturaSlice";

export default configureStore({
    reducer: {
        user: loginReducer,
        transactions: transactionReducer,
        constants: constantsReducer,
        cashRegister: salesOfficeReducer,
        modoFactura: modoFacturaReducer
    }
})