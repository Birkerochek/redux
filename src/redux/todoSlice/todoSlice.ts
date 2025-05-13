import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ITodo{
    id: number,
    title: string;
    completed: boolean
}

interface TodoState{
    entities: ITodo[],
    loading: 'idle' | 'failed' | 'pending' | 'succeeded' 
    filter: 'all' | 'active' | 'completed'
}

const initialState: TodoState = {
    entities: [
        {id: 1, title: 'Изучить Redux', completed: false},
        {id: 2, title: 'Изучить ReduxToolkit', completed: false},

    ],
    loading: 'idle',
    filter: 'all'
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers:{
        addTodo: (state, action: PayloadAction<ITodo>) =>{
            state.entities.push(action.payload)
        },
        removeTodo: (state, action: PayloadAction<number>) => {
            state.entities = state.entities.filter(todo => todo.id !== action.payload)
          },
          
        toggleTodo: (state, action: PayloadAction<number>) =>{
            const todo = state.entities.find(t => t.id === action.payload)
            if(todo){todo.completed = !todo.completed}
        },
        setFilter: (state, action: PayloadAction<'all' | 'active' | 'completed'>) => {
            state.filter = action.payload
            
        },

    }
})

export const { addTodo, removeTodo, toggleTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;