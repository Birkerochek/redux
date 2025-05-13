'use client'
import { addToCart, removeFromCart } from "@/redux/cartSlice/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

interface IItem {
    id: number;
    title: string;
    price: number
}


export default function page() {
    const data: IItem[] = [
        { id: 1, title: 'Товар 1', price: 20000 },
        { id: 2, title: 'Товар 2', price: 30000 },
        { id: 3, title: 'Товар 3', price: 40000 },
    ]
    const items = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)
    const dispatch = useDispatch<AppDispatch>()
    const handleAddToCard = (item: IItem) => {
        dispatch(addToCart(item))
    }
    const handleRemoveFromCard = (item: IItem) => {
        dispatch(removeFromCart(item))
    }

    return (
        <div>
            <h1>Все товары</h1>
            {data.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <button onClick={() => handleAddToCard(item)}>Добавить в корзину</button>
                </div>
            ))
            }
            <h2>Корзина</h2>
            <h3>Товары в корзине</h3>
            {items.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <p>Количество: {item.count}</p>
                    <button onClick={() => handleAddToCard(item)}>+</button>
                    <button onClick={() => handleRemoveFromCard(item)}>Удалить с корзины</button>

                </div>
            ))}
            <h4>Общая сумма: {totalPrice}</h4>
            <h4>Общее количество: {items.reduce((total, item) => total + item.count, 0)}</h4>

        </div>
    );
}