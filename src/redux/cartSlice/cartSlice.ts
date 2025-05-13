import { createSlice } from "@reduxjs/toolkit";


interface ICartItem {
    id: number;
    title: string;
    price: number;
    count: number;
}

interface CartState {
    items: ICartItem[];
    totalPrice: number;
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
};
function calculateTotalPrice(items: ICartItem[]) {
    return items.reduce((sum, item) => sum + item.price * item.count, 0);
}


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.count += 1;
            } else {
                state.items.push({ ...action.payload, count: 1 });
            }
            state.totalPrice = calculateTotalPrice(state.items);
        },
        removeFromCart: (state, action) => {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.count -= 1;
                if (item.count === 0) {
                    state.items = state.items.filter(i => i.id !== action.payload.id);
                }
            }
            state.totalPrice = calculateTotalPrice(state.items);

        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;