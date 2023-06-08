import React, {useState} from 'react';
import {CartState} from "../../types/types"
import {toDollarString} from "../../utils"
import './Cart.css';
import {axiosPostRequest} from '../../services/api_service'



interface Props {
  cartState: CartState;
  updateCartDispatch: (action: {type: string, payload: {}}) => any 
}


const  CheckoutForm:React.FC <Props> = ({cartState, updateCartDispatch}) => {
    const [userMessage, setUserMessage] = useState("Please checkout now.")

    
    const us_tax_states = Object.keys(cartState.us_tax_rates)
    

    const submitCreateOrder = async () => {
      // console.log(`Submit Order with ${cartState.basket_items.length} items`)
  

      
      const submit_order_url = "orders/create"
  
      const sessionUser = await sessionStorage.getItem('user')
      console.log(`Submit order - Session User ${JSON.stringify(sessionUser)}`)

      const newOrderDetails = {
        user_uuid: cartState.user_uuid,
        delivery_us_state: cartState.delivery_us_state,
        order_items: cartState.basket_items
      }  
  
      const orderPayload = JSON.stringify(newOrderDetails)

   
      try {

          const response = await axiosPostRequest(submit_order_url, orderPayload)
          //console.log("order response  ", response)
          const data = await response.data
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
            <div>LocalUser Message:  {userMessage}</div>
            <div>Session storage User {sessionStorage.user}</div> 
            {sessionStorage.user &&
              <div>Session User Name {JSON.parse(sessionStorage.user).name}</div>  
            }
            <div>Number of Items: {cartState.basket_items.length}</div>
            <div> Price Total: {toDollarString(cartState.price_total)} </div>
            <div> Tax Total: {toDollarString(cartState.tax_total)} </div>
            {/* <div> User: {cartState.user_uuid}</div>
            <div>home_state: {cartState.delivery_us_state}</div> */}

          </div>
          <div>
            {renderUSTaxRates()} 
          </div>
          <button onClick={submitCreateOrder}>Submit Order</button>
          
      </div>
    );
}

export default CheckoutForm;
