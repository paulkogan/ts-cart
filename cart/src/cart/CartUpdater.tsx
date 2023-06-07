//import React, {useState, useReducer} from 'react';
import {CartState, OrderItem} from "../types/types"
import {cloneDeep} from 'lodash'


const reduceCartTotals = (basket_items: OrderItem[]) : {price: number, tax: number} => {
    return basket_items.reduce((tots, item: OrderItem) => {
        tots.price = tots.price+item.cost;
        tots.tax = tots.tax+item.tax
        return tots
      }, {price:0, tax:0});

}


const CartUpdater = (state: CartState,  action: any) => {

    const {
        basket_items, 
        delivery_us_state,
        us_tax_rates, 
        user_uuid,
        price_total,
        tax_total
    } = state
    // need to clone the array to avoid double execution under TS Strict in DEV 
    
    const new_basket_items = cloneDeep(basket_items)
    

    switch(action.type) {

        case "SUBMIT_ORDER":

            return {
                ...state,
                price_total: 0,
                tax_total: 0,
                basket_items: [],
            }

        case "ADD_ITEM":
            // will use cache if same item 
            let new_basket_item = cloneDeep(action.payload.product)
            let tax_rate = 0.0
            let tax_amount = 0

            if (delivery_us_state) {
                tax_rate = us_tax_rates[delivery_us_state]/100
                tax_amount = Math.round(new_basket_item.price * tax_rate)
              
            }
            //console.log(`REDUCE: Tax amount ${tax_amount} with rate ${tax_rate} for ${new_basket_item.price}`)
            //new_tax_by_state[us_state] = new_tax_by_state[us_state as keyof typeof USTaxState] + tax_amount

            const same_in_basket = new_basket_items.find(item => item.product_id === new_basket_item.product_id)

            if (same_in_basket) { //already in cart
                same_in_basket.num_units += 1
                same_in_basket.cost = same_in_basket.price*same_in_basket.num_units
                same_in_basket.tax = tax_amount*same_in_basket.num_units
                const totals = reduceCartTotals(new_basket_items)
                return {
                    ...state,
                    basket_items: new_basket_items,
                    tax_total: totals.tax,
                    price_total: totals.price,
                }

            } else {
                //new non-dup item
                new_basket_item.num_units = 1
                new_basket_item.tax = tax_amount
                new_basket_item.cost = new_basket_item.price
                

        
                // block double-adds due to React strict mode for useReducer hook using product_id
                if (!new_basket_items.find(item => item.product_id === new_basket_item.product_id)){
                
                    new_basket_items.push(new_basket_item)
                    const totals = reduceCartTotals(new_basket_items)

                    return {
                        ...state,
                        basket_items: new_basket_items,
                        tax_total: totals.tax,
                        price_total: totals.price
                    }
                        
                } else {
                    console.log(`DUPLICATE, not adding:  ${new_basket_item.product_id} `)
                    return state
                }
            }    

        case "SET_customer_details":
    
                state = {...state, 
                    delivery_us_state: action.payload.delivery_us_state, 
                    user_uuid: action.payload.user_uuid
                }
                return state

        //REMOVE!
        case "UPDATE_STATE_TAX_RATES":
            const new_tax_rates = action.payload.us_tax_rates

            state = {...state, 
                us_tax_rates: new_tax_rates
            }
            return state

        default:
            return state 

    }


}

export default CartUpdater;
