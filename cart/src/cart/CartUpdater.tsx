import React, {useState, useReducer} from 'react';
import {CartState, BasketItem} from "../types/types"
import {cloneDeep} from 'lodash'


const CartUpdater = (state: CartState,  action: any) => {

    const {
        basket_items, 
        next_item_id, 
        delivery_us_state,
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

            if (delivery_us_state) {
                tax_rate = us_tax_rates[delivery_us_state]/100
                tax_amount = parseFloat((parseFloat(new_basket_item.price) * tax_rate).toFixed(2))
                new_tax_by_state[delivery_us_state] = new_tax_by_state[delivery_us_state] + tax_amount
            }
            console.log(`REDUCE: Tax amount ${tax_amount} with rate ${tax_rate} for ${new_basket_item.price}`)
            //new_tax_by_state[us_state] = new_tax_by_state[us_state as keyof typeof USTaxState] + tax_amount


            new_basket_item.basketItemId = next_item_id 
            new_basket_item.num_items = 1
            new_basket_item.tax = tax_amount 

            // block double-adds due to React strict mode for useReducer hook
            if (!new_basket_items.find(item => item.basketItemId === new_basket_item.basketItemId)){
            
                new_basket_items.push(new_basket_item)
                return {
                    ...state,
                    next_item_id: next_item_id+1,
                    basket_items: new_basket_items,
                    tax_by_state: new_tax_by_state
                }
                    
            } else {
                console.log(`DUPLICATE, not adding:  ${new_basket_item.basketItemId} `)
                return state
            }


        case "SET_delivery_us_state":
                const new_delivery_us_state = action.payload.delivery_us_state
    
                state = {...state, 
                    delivery_us_state: new_delivery_us_state
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
