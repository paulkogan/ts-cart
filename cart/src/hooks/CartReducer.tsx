//import React, {useState, useReducer} from 'react';
import {CartState, OrderItem} from "../types/types"
import {cloneDeep} from 'lodash'
import {getTaxRates, getTaxRateForState} from "../utils"

const reduceCartTotals = (basket_items: OrderItem[]) : {price: number, tax: number} => {
    return basket_items.reduce((tots, item: OrderItem) => {
        tots.price = tots.price+item.cost;
        tots.tax = tots.tax+item.tax
        return tots
      }, {price:0, tax:0});

}


const CartUpdater = (state: CartState,  action: {type:string, payload: any}) => {

    const {
        basket_items, 
        delivery_us_state,
        user_uuid,
        price_total,
        tax_total, 
        user_message
    } = state
    // need to clone the array to avoid double execution under TS Strict in DEV 
    
    const new_basket_items = cloneDeep(basket_items)
    const us_tax_rates = getTaxRates()

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

            //tax amount is just zero if no us_state
            if (delivery_us_state) {
                tax_rate = getTaxRateForState(delivery_us_state)/100
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

        case "SET_CUSTOMER_DETAILS":
    
                state = {...state, 
                    delivery_us_state: action.payload.home_state, 
                    user_uuid: action.payload.user_uuid
                }
                return state

        case "UPDATE_MESSAGE":
                state = {...state, 
                    user_message: action.payload.user_message, 

                }
                return state


        default:
            return state 

    }


}

export default CartUpdater;
