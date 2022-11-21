import React, {useState, useReducer} from 'react';
import {CartState, BasketItem} from "../types/types"
import {cloneDeep} from 'lodash'


const CartUpdater = (state: CartState,  action: any) => {

    const {
        basket_items, 
        next_cart_id, 
        buyer_state,
        tax_by_state,
        us_tax_rates
    } = state
    // need to clone the array to avoid double execution under TS Strict in DEV 
    const new_tax_by_state = cloneDeep(tax_by_state)
    const new_basket_items = cloneDeep(basket_items)
    

    switch(action.type) {

        case "ADD_ITEM":
            // will use cache if sam item 
            let new_basket_item = cloneDeep(action.payload.product)
            let tax_rate = 0.0
            let tax_amount = 0.0

            if (buyer_state) {
                tax_rate = us_tax_rates[buyer_state]/100
                tax_amount = new_basket_item.price * tax_rate
                new_tax_by_state[buyer_state] = new_tax_by_state[buyer_state] + tax_amount
            }
            console.log(`REDUCE: Tax amount ${tax_amount} with rate ${tax_rate} for ${new_basket_item.price}`)
            //new_tax_by_state[us_state] = new_tax_by_state[us_state as keyof typeof USTaxState] + tax_amount


            new_basket_item.cart_id = next_cart_id 
            new_basket_item.num_items = 1
            new_basket_item.tax = tax_amount 

            // block double-adds due to React strict mode for useReducer hook
            if (!new_basket_items.find(item => item.cart_id === new_basket_item.cart_id)){
            
                new_basket_items.push(new_basket_item)
                return {
                    ...state,
                    next_cart_id: next_cart_id+1,
                    basket_items: new_basket_items,
                    tax_by_state: new_tax_by_state
                }
                    
            } else {
                console.log(`DUPLICATE, not adding:  ${new_basket_item.cart_id} `)
                return state
            }


        case "SET_BUYER_STATE":
                const new_buyer_state = action.payload.buyer_state
    
                state = {...state, 
                    buyer_state: new_buyer_state
                }
                return state

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
