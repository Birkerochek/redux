'use client';
import { decrement, increment, incrementByAmount } from "@/redux/counterSlice/counterSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";


export default function Counter() {

    const count = useSelector((state: RootState) => state.counter.value)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <div>
            <h1>Счетчик: {count} </h1>
            <button onClick={() => dispatch(increment())}>Увеличить</button>
            <button onClick={() => dispatch(decrement())}>Уменьшить</button>
            <button onClick={() => dispatch(incrementByAmount(10))}>Увеличить на 10</button>
            
        </div>

    );
}   