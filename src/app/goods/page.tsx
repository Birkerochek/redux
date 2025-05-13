'use client'
import { addToCart } from "@/redux/cartSlice/cartSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

export interface IItem {
    id: number;
    title: string;
    price: number
}


export default function page() {
    const itemAddedIds = useSelector((state: RootState) => state.cart.itemAddedIds)
    const data: IItem[] = [
        { id: 1, title: 'Товар 1', price: 20000 },
        { id: 2, title: 'Товар 2', price: 30000 },
        { id: 3, title: 'Товар 3', price: 40000 },
    ]
    const dispatch = useDispatch<AppDispatch>()
    const handleAddToCard = (item: IItem) => {
        dispatch(addToCart(item))

    }

    return (
        <div>
            <Link href={'/'}>На главную</Link>
            <h1>Все товары</h1>
            {data.map((item) => (
                <div key={item.id}>
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    {itemAddedIds.includes(item.id)
                        ?
                        <Link href={'cart'}>
                            <button>Перейти в корзину</button>
                        </Link>
                        :
                        <button onClick={() => handleAddToCard(item)}>Добавить в корзину</button>
                    }
                </div>
            ))
            }
            <Link href={'cart'}>Перейти в корзину</Link>



        </div>
    );
}