'use client'

import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, IPost } from "@/redux/fetchSlice/fetchSlice";

export default function PostsList() {
    const dispatch = useDispatch<AppDispatch>()
    const posts = useSelector((state: RootState) => state.fetch.entities)
    const loading = useSelector((state: RootState) => state.fetch.loading)

    const postsOg = posts.slice(0, 5)

    const handleFetch = () => {
        dispatch(fetchPosts())
    }
    return (
        <div>
            <button onClick={handleFetch} disabled={loading === "pending"}>Загрузить посты</button>
            {loading === "pending" && <p>Loading...</p>}
            {loading === "failed" && <p>Failed to load posts</p>}
            {loading === "succeeded" && <ul>
                {postsOg.map((user: IPost) => (
                    <li key={user.id}>
                        <h3>{user.title}</h3>
                        <p>{user.body}</p>
                    </li>
                ))}
            </ul>}

        </div>
    );
}