import React, {useState, useReducer} from 'react';
import {CartState} from "../types/types"
import {toDollarString} from "../utils"
import './Cart.css';



interface Props {
  cartState: CartState;
  updateCartDispatch: (action: {type: string, payload: {}}) => any 
}


const  CheckoutForm:React.FC <Props> = ({cartState, updateCartDispatch}) => {
    const [userMessage, setUserMessage] = useState("Please checkout now.")

    
    const us_tax_states = Object.keys(cartState.us_tax_rates)

    const submitCreateOrder = async () => {
      console.log(`Submit Order with ${cartState.basket_items.length} items`)
  
      const submit_order_url = "http://localhost:3001/orders/create"
  
      const newOrderDetails = {
        user_uuid: cartState.user_uuid,
        delivery_us_state: cartState.delivery_us_state,
        order_items: cartState.basket_items
      }  
  
      const submitOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newOrderDetails)
      };
        
   
      try {
          const response= await fetch(submit_order_url , submitOptions)
          const data = await response.json()
          // console.log("order response status ", response.status)
          // console.log("NEW ORDER DATA is  ", data)
          if (response.status > 300) {
              setUserMessage(data.message)
              //setRegStatus("error")
  
  
          } else {
              setUserMessage(`Success! order submitted: ${data.order_uuid}.`)
  
              //clear cart
              updateCartDispatch({
                type: "SUBMIT_ORDER", 
                payload: {}
              })
  
          }
          
  
        } catch(error) {
              setUserMessage(`Error: failed to create order with:  ${error}`)
              console.log("Error: failed to create order with: ", error)
              //setRegStatus("error")
        }  
      }   
  



  const renderUSTaxRates = ():JSX.Element[]  => {

    return us_tax_states.map(state =>  {
      return (
        <div key={state} className="basket-outer-item" >
              {state} {cartState.us_tax_rates[state].toFixed(2)}%
        </div>
      )
    })

  }

    return (
      <div>

          <div className="cart-status">
            <div> User: {cartState.user_uuid}</div>
            <div>home_state: {cartState.delivery_us_state}</div>
            <div>Number of Items: {cartState.basket_items.length}</div>
            <div> Price Total: {toDollarString(cartState.price_total)} </div>
            <div> Tax Total: {toDollarString(cartState.tax_total)} </div>
            <div>Next Cart id: {cartState.next_item_id}</div>
          </div>
          <div>
            {renderUSTaxRates()} 
          </div>
          <button onClick={submitCreateOrder}>Submit Order</button>
          
      </div>
    );
}

export default CheckoutForm;


