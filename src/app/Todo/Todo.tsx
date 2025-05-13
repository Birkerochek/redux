'use client'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Todo.module.scss'
import { AppDispatch, RootState } from '@/redux/store'
import { addTodo, removeTodo, setFilter, toggleTodo } from '@/redux/todoSlice/todoSlice'
import { useState } from 'react'

export const Todo = () => {
    const [title, setTitle] = useState('')
    const filter = useSelector((state: RootState) => state.todo.filter)
    const todos = useSelector((state: RootState) => state.todo.entities)
    const visibleTodos = todos.filter(todo => {
        switch (filter) {
            case 'active': return !todo.completed;
            case 'completed': return todo.completed;
            default: return true;            
        }
    });

    const dispatch = useDispatch<AppDispatch>()

    const handleRemove = (id: number) => {
        dispatch(removeTodo(id))
    }

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) {
            return
        }
        const newTodo = {
            id: Date.now(),
            title: title,
            completed: false
        }
        dispatch(addTodo(newTodo))
        setTitle('')
    }

    return (
        <>
            <div className={styles.todos}>
                <div>
                    <button
                        disabled={filter === 'all'}
                        onClick={() => dispatch(setFilter('all'))}
                    >
                        Все
                    </button>
                    <button
                        disabled={filter === 'active'}
                        onClick={() => dispatch(setFilter('active'))}
                    >
                        Активные
                    </button>
                    <button
                        disabled={filter === 'completed'}
                        onClick={() => dispatch(setFilter('completed'))}
                    >
                        Завершённые
                    </button>
                </div>

                <form onSubmit={handleAdd}>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Введите название задачи' />
                    <button type='submit'>Добавить</button>
                </form>

                {visibleTodos.map((todo) => (
                    <div key={todo.id}>
                        <h1>{todo.title}</h1>
                        <input type="checkbox" checked={todo.completed} onChange={() => dispatch(toggleTodo(todo.id))} />
                        <button onClick={() => handleRemove(todo.id)}>Удалить</button>
                    </div>
                ))}

            </div>
        </>
    )
}