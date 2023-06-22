import React, {Dispatch, SetStateAction} from 'react';
import {CartState} from "../../types/types"
import {toDollarString} from "../../utils"
import './Cart.css';
import {axiosPostRequest} from '../../services/api_service'
import {getTaxRates} from "../../utils"

type UpdateStringState = Dispatch<SetStateAction<string>>

interface Props {
  cartState: CartState;
  updateCartDispatch: (action: {type: string, payload: {}}) => any 
  updateMessage: UpdateStringState
}


const  CheckoutForm:React.FC <Props> = ({cartState, updateCartDispatch, updateMessage}) => {

    const taxRatesDict = getTaxRates()
    const us_tax_states = Object.keys(taxRatesDict)


    const submitCreateOrder = async () => {
      const submit_order_url = "orders/create"

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
          console.log("NEW ORDER DATA is  ", data)
          if (response.status > 300) {
              updateMessage(data.message)
              //setRegStatus("error")
  
  
          } else {
              const order_total = (data.items_total+data.tax_total+data.shipping_total)
              updateMessage(`Success! order submitted. Total is: $${toDollarString(order_total)}.`)
  
              //clear cart
              updateCartDispatch({
                type: "SUBMIT_ORDER", 
                payload: {}
              })
  
          }
          
  
        } catch(error:any) {
              updateMessage(`Error: failed to create order with:  ${error.response.data}`)
              console.log("Error: failed to create order with: ", error)
              //setRegStatus("error")
        }  
      }   
  



  const renderUSTaxRates = ():JSX.Element[]  => {

    return us_tax_states.map((state) =>  {
      return (
        <div key={state} className="basket-outer-item" >
              {state} {(taxRatesDict as any) [state]} %

        </div>
      )
    })

  }

    return (
      <div>
         

          <div className="cart-status">
      
            {sessionStorage.user? 
            (
              <div> 
                <div>Session User Name: {JSON.parse(sessionStorage.user).name}</div>  
                <div>Session User State: {JSON.parse(sessionStorage.user).home_state}</div>  
              </div>
            ) :
            (<div> NO Session User </div>)
            }
            <div>Number of Items: {cartState.basket_items.length}</div>
            <div> Price Total: {toDollarString(cartState.price_total)} </div>
            <div> Tax Total: {toDollarString(cartState.tax_total)} </div>
            <div> Order Total: {toDollarString(cartState.tax_total+cartState.price_total)} </div>

          </div>
          <div>
            {renderUSTaxRates()} 
          </div>
          <button onClick={submitCreateOrder}>Submit Order</button>
          
      </div>
    );
}

export default CheckoutForm;
