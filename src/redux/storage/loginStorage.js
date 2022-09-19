import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../reducer/loginSlice";

export default configureStore({
    reducer : {
        user: loginReducer,
    }
})