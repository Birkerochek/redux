'use client'
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { IItem } from "../goods/page";
import { addToCart, removeFromCart } from "@/redux/cartSlice/cartSlice";
import Link from "next/link";

export default function page() {
        const items = useSelector((state: RootState) => state.cart.items)
    const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)
    const dispatch = useDispatch<AppDispatch>()
        const handleRemoveFromCard = (item: IItem) => {
        dispatch(removeFromCart(item))
    }
    const handleAddToCard = (item: IItem) => {
            dispatch(addToCart(item))
        }

    return (
        <div>
            <Link href={'goods'}>К товарам</Link>
            <h1>Корзина</h1>
             <h3>Товары в корзине</h3>
            {items.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <p>Количество: {item.count}</p>
                    <button onClick={() => handleAddToCard(item)}>+</button>
                    <button onClick={() => handleRemoveFromCard(item)}>-</button>

                </div>
            ))}
            <h4>Общая сумма: {totalPrice}</h4>
            <h4>Общее количество: {items.reduce((total, item) => total + item.count, 0)}</h4>
        </div>
    );
}