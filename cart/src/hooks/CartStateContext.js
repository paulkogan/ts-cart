import React, {useReducer} from 'react';
import CartReducer from './CartReducer';
import useAuth from './useAuth'

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
//     //check session storage for user info    
//     const user = sessionStorage.getItem('sessionData')
//     if (user) {
//          const userObj = JSON.parse(user)
//          initialCartState.user_uuid = userObj.user_uuid
//          initialCartState.delivery_us_state = userObj.home_state
//         console.log("adding user info to cartState")
//     } else {
//         console.log("No user info in sessionStorage to add to cartState")
//     }

//     return initialCartState
// }


const CartStateContext = React.createContext();


export const CartStateProvider = ({ children }) => {
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