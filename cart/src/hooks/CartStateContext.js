import React, {useReducer} from 'react';
import CartReducer from './CartReducer';


const initialCartState = {
    "user_uuid": "",
    "basket_items" : [],
    "delivery_us_state": "",
    "us_tax_rates": {},
    price_total:0.0,
    tax_total:0.0
  }

const CartStateContext = React.createContext();


export const CartStateProvider = ({ children }) => {
    const [cartState, updateCartDispatch] = useReducer(CartReducer, initialCartState);
 
    return (
        <CartStateContext.Provider value={{cartState, updateCartDispatch}}>
            {children}
        </CartStateContext.Provider>
    );
};




export {CartStateContext}