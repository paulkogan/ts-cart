import React, {useState, useReducer} from 'react';
import {CartState} from "../types/types"
import './Cart.css';



interface Props {
  cartState: CartState;
  updateCartDispatch: (action: {type: string, payload: {}}) => any 
}


const  CheckoutForm:React.FC <Props> = ({cartState, updateCartDispatch}) => {


    
    const us_tax_states = Object.keys(cartState.us_tax_rates)
    const [buyerState, setBuyerState] = useState(us_tax_states[0].toString())  

    const handleChange = (fieldName: string, fieldValue: string | number): void => {
      console.log(`HandleChange: ${fieldName} ${fieldValue}`)
      setBuyerState(fieldValue.toString())
    };

    const handleSubmit = ():void => {
      console.log(`handleSubmit ${buyerState} `)
      updateCartDispatch({
        type: "SET_BUYER_STATE", 
        payload: {buyer_state: buyerState }
      })
      
    }



  //   export interface CartState {
  //     basket_items: BasketItem[];
  //     next_cart_id: number,
  //     buyer_state: string | undefined,  
  //     tax_by_state: TaxByState;
  //     us_tax_rates: TaxByState | {} | any;
  //{"Number of Items:" {cartState.basket_items}}
  
  // }



  const renderTaxbyState = ():JSX.Element[]  => {
    const stateKeys = Object.keys(cartState.tax_by_state)
    return stateKeys.map(state=> {
      return (
          <div key={state} className="state-tax-item" >
            <span> {state} </span> : <span> ${cartState.tax_by_state[state]}</span>
          </div>
      )
    })
  }



    return (
      <div>

          <div className="cart-status">
            <div>Number of Items: {cartState.basket_items.length}</div>
            <div>Next Cart id: {cartState.next_cart_id}</div>
            <div>Buyer State: {cartState.buyer_state}</div>
          </div>




          <div className="cart-settings">
            <div>
                <select 
                    name="us_state"
                    onChange = {event => {handleChange(event.target.name, event.target.value) }}
                    defaultValue={"..."} 
                  >
                  {us_tax_states.map((state_rate: any) => <option key={state_rate} value={state_rate}>{state_rate}</option>   )}
              
                </select>
            </div>
            <div>
               <button onClick={handleSubmit}>Update</button>
            </div>  
          </div>

          <div className="cart-tax-by-state">
               Tax by State: {renderTaxbyState()}
          </div>
          
          
      </div>
    );
}

export default CheckoutForm;


