import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const username = Cookies.get('username')
const cartUser = Cookies.get(`cart_${username}`)
let getCartUser = () => {
    if(username){
        return cartUser?JSON.parse(cartUser): [];
    }else{
        return [];
    }
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: getCartUser(),
        total: 0,
    },
    reducers: {
        addUpdateItem: (state, action) => {
            if (!username) {
                return;
            }
            let item = action.payload;
            let existItem = state.items.find(i => i.id === item.id)
            if (!existItem) {
                state.items.push({ ...item, 'itemTotal': (item.quantity * item.price) })
                state.total += (item.quantity * item.price);
                state.quantity += item.quantity;
            } else {
                existItem.quantity += item.quantity;
                existItem.itemTotal += (item.quantity * item.price);
                state.total += (item.quantity * item.price);
                state.quantity += item.quantity;
            }
            Cookies.set(`cart_${username}`, JSON.stringify(state.items));
            console.log(Cookies.get(`cart_${username}`));
        },
        removeItem: (state, action) => {
            if (!username) {
                return;
            }
            let item = action.payload;
            let remove = false;

            state.items.find((v, i) => {
                if (!remove) {
                    if (v.id === item.id) {
                        state.total -= v.itemTotal;
                        state.quantity -= v.quantity;
                        state.items.splice(i, 1);
                        remove = true;
                    }
                }
            })
            Cookies.set(`cart_${username}`, JSON.stringify(state.items));
        }
    }
})

export const { addUpdateItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;