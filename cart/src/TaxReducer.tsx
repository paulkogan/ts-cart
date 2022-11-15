import React, {useState, useReducer} from 'react';
import {TaxRates, CartState, TaxByState} from "./types/types"
import {cloneDeep} from 'lodash'




const TaxReducer = (state: CartState, action: any) => {

    const {
        items_total, 
        num_items, 
        next_cart_id, 
        tax_by_state,
    } = state
    // need to clone the array to avoid double execution under TS Strict in DEV 
    const new_tax_by_state = cloneDeep(tax_by_state)

    switch(action.type) {
        case "ADD_TO_CART":
            const item_amount= action.payload.item_amount
            const us_state = action.payload.us_state

            const tax_rate = TaxRates[us_state as keyof typeof TaxRates]/100
            const tax_amount = item_amount * tax_rate
            // console.log(`Tax amount ${tax_amount} with rate ${tax_rate} for ${item_amount}`)
            new_tax_by_state[us_state] = new_tax_by_state[us_state as keyof typeof TaxRates] + tax_amount

            state = {...state, 
                tax_by_state: new_tax_by_state, 
                items_total: items_total+item_amount,
                num_items: num_items+1,
                next_cart_id: next_cart_id +1
            }
            return state

        default:
            return state 

    }




}

export default TaxReducer;
