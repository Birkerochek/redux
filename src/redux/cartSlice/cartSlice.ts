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
    itemAddedIds: number[];
}

const initialState: CartState = {
    items: [],
    totalPrice: 0,
    itemAddedIds: [],
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
            if(!state.itemAddedIds.includes(action.payload.id)) {
                state.itemAddedIds.push(action.payload.id);
            }

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
           state.itemAddedIds = state.itemAddedIds.filter(id => id !== action.payload.id);

        }
    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;