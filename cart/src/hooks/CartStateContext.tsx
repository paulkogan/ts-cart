import React, {useReducer} from 'react';
import CartReducer from './CartReducer';
import useAuth from './useAuth'
import type {CartStateContextType} from "../types/types"

const initialCartState = {
    "user_uuid": "",
    "basket_items" : [],
    "delivery_us_state": "",
    price_total:0.0,
    tax_total:0.0, 
    user_message: "Welcome!"
}

// dont need this because not updating cartState on initialization, rather on cart page load
// and refreshing if necessary from sessionStorage.sessionData

// const initializeCartState = () => {




interface ProviderProps {
    children: React.ReactNode;
  }


const CartStateContext = React.createContext<CartStateContextType| null > (null);
//const CartStateContext = React.createContext (null);


export const CartStateProvider: React.FC<ProviderProps> = ({ children}) => {
    const [cartState, updateCartDispatch] = useReducer(CartReducer, initialCartState);


    //get the useAuth hook -- call it with updateCartDispatch
    
    const auth = useAuth(updateCartDispatch) 
   //wrap in useMemo to avoid double load
 
    return (
        <CartStateContext.Provider value={{cartState, updateCartDispatch, auth}}>
            {children}
        </CartStateContext.Provider>
    );
};




export {CartStateContext}