import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice/counterSlice";
import fetchReducer from "./fetchSlice/fetchSlice";
import todoReducer from './todoSlice/todoSlice'
import cartReducer from './cartSlice/cartSlice'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        fetch: fetchReducer,
        todo: todoReducer,
        cart: cartReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;