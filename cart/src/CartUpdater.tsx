import React, {useState, useReducer} from 'react';
import {CartState} from "./types/types"
import {cloneDeep} from 'lodash'




const CartUpdater = (state: CartState,  action: any) => {

    const {
        num_items, 
        items_total, 
        next_cart_id, 
        tax_by_state,
        us_tax_rates
    } = state
    // need to clone the array to avoid double execution under TS Strict in DEV 
    const new_tax_by_state = cloneDeep(tax_by_state)

    switch(action.type) {
        case "ADD_ITEM":
            const item_amount= action.payload.item_amount
            const us_state = action.payload.us_state

            //const tax_rate = TaxRates[us_state as keyof typeof TaxRates]/100
            const tax_amount = item_amount * 10.0
            // console.log(`Tax amount ${tax_amount} with rate ${tax_rate} for ${item_amount}`)
            //new_tax_by_state[us_state] = new_tax_by_state[us_state as keyof typeof USTaxState] + tax_amount
            new_tax_by_state[us_state] = new_tax_by_state[us_state] + tax_amount

            state = {...state, 
                tax_by_state: new_tax_by_state, 
                items_total: items_total+item_amount,
                num_items: num_items+1,
                next_cart_id: next_cart_id +1
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
