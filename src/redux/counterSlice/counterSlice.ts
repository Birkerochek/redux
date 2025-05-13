import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";



interface ICounter{
    value: number,
    
}

const initialState: ICounter= {
    value: 1,
    


}

export const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers:{
        increment: (state) =>{
            state.value += 1
        },
        decrement: (state) =>{
            state.value -= 1
        },
        incrementByAmount:(state, action: PayloadAction<number>) =>{
            state.value += action.payload
        }
    }
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;