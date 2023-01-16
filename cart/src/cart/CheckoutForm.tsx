import React, {useState, useReducer} from 'react';
import {CartState} from "../types/types"
import './Cart.css';



interface Props {
  cartState: CartState;
  updateCartDispatch: (action: {type: string, payload: {}}) => any 
}


const  CheckoutForm:React.FC <Props> = ({cartState, updateCartDispatch}) => {


    
    const us_tax_states = Object.keys(cartState.us_tax_rates)
    //const [buyerState, setBuyerState] = useState(us_tax_states[0].toString())  

    // const handleChange = (fieldName: string, fieldValue: string | number): void => {
    //   console.log(`HandleChange: ${fieldName} ${fieldValue}`)
    //   setBuyerState(fieldValue.toString())
    // };

    const handleSubmit = ():void => {
      console.log(`Submit Order for ${cartState.basket_items.length} `)
      updateCartDispatch({
        type: "SUBMIT_ORDER", 
        payload: {}
      })
      
    }



  //   export interface CartState {
  //     basket_items: OrderItem[];
  //     next_item_id: number,
  //     delivery_us_state: string | undefined,  
  //     tax_by_state: TaxByState;
  //     us_tax_rates: TaxByState | {} | any;
  //{"Number of Items:" {cartState.basket_items}}
  
  // }

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
            <div>Number of Items: {cartState.basket_items.length}</div>
            <div>Next Cart id: {cartState.next_item_id}</div>
            <div>home_state: {cartState.delivery_us_state}</div>
          </div>
          <div>
            {renderUSTaxRates()} 
          </div>
          <button onClick={handleSubmit}>Submit Order</button>
          
      </div>
    );
}

export default CheckoutForm;


