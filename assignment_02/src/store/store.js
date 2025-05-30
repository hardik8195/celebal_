import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./TodoSLice"

const store = configureStore({
    reducer: {
        todo: todoReducer
    }
})

export default store