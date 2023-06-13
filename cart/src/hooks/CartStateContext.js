import React, {useReducer} from 'react';
import CartReducer from './CartReducer';


const initializeCartState = () => {

    const initialCartState = {
        "user_uuid": "",
        "basket_items" : [],
        "delivery_us_state": "",
        "us_tax_rates": {},
        price_total:0.0,
        tax_total:0.0
    }

    //check session storage for user info    
    const user = sessionStorage.getItem('user')
    if (user) {
         const userObj = JSON.parse(user)
         initialCartState.user_uuid = userObj.user_uuid
         initialCartState.delivery_us_state = userObj.home_state
        console.log("adding user info to cartState")
    } else {
        console.log("No user info in sessionStorage to add to cartState")
    }

    return initialCartState
}


const CartStateContext = React.createContext();


export const CartStateProvider = ({ children }) => {
    const [cartState, updateCartDispatch] = useReducer(CartReducer, initializeCartState());

 
    return (
        <CartStateContext.Provider value={{cartState, updateCartDispatch}}>
            {children}
        </CartStateContext.Provider>
    );
};




export {CartStateContext}