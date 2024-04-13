import { create } from 'zustand';
import { ActionType, CartType } from './types';
import { persist } from 'zustand/middleware';

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0,
   
}
export const useCartStore = create(persist<CartType & ActionType>((set, get) => ({
    products:INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
   
    addToCart(item) {
        set((state) => ({
            products:[...state.products, item],
            totalItems: state.totalItems + item.quantity,
            totalPrice: state.totalPrice + item.price,
          
        }))
    },
    removeFromCart(item) {
        set((state) => ({
          products: state.products.filter(product => product.name !== item.name),
          totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - item.price,
           

        }))
    },
    emptyCart() {
        set(() => ({
            products: [],
            totalItems: 0,
            totalPrice: 0,
           
        }))
    },
}),{name:'cart-storage'}
))
