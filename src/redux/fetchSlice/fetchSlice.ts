import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async() => {
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
            return response.data

        } catch (err){
            console.log(err)
        }
    }
)
export interface IPost{
    id: number,
    title: string;
    body: string
}
interface PostsState{
    entities: IPost[],
    loading: 'idle' | 'failed' | 'pending' | 'succeeded' 
}

const initialState: PostsState = {
    entities: [],
    loading: 'idle'
}

export const fetchSlice = createSlice({
    name: "fetch",
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder
        .addCase(fetchPosts.pending,   state => { state.loading = 'pending' })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.loading = 'succeeded';
          state.entities = action.payload;
        })
        .addCase(fetchPosts.rejected,  state => { state.loading = 'failed' });
      
    },

})

export default fetchSlice.reducer