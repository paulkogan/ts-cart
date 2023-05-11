import React, {useState, useReducer} from 'react';
import {CartState, OrderItem} from "../types/types"
import {cloneDeep} from 'lodash'


const reduceTotals = (basket_items: OrderItem[]) => {
    return basket_items.reduce((tots:any, item) => {
        const totPriceFloat = parseFloat((Number(item.price)*item.num_units).toFixed(2))
        const totTaxFloat = parseFloat(Number(item.tax*item.num_units).toFixed(2))

        tots.price = tots.price+totPriceFloat;
        tots.tax = tots.tax+totTaxFloat;
        return tots
      }, {price:0.0, tax:0.0});

}


const CartUpdater = (state: CartState,  action: any) => {

    const {
        basket_items, 
        next_item_id, 
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
                price_total: 0.0,
                tax_total: 0.0,
                basket_items: [],
            }

        case "ADD_ITEM":
            // will use cache if sam item 
            let new_basket_item = cloneDeep(action.payload.product)
            let tax_rate = 0.0
            let tax_amount = 0.0

            if (delivery_us_state) {
                tax_rate = us_tax_rates[delivery_us_state]/100
                tax_amount = parseFloat((parseFloat(new_basket_item.price) * tax_rate).toFixed(2))
              
            }
            console.log(`REDUCE: Tax amount ${tax_amount} with rate ${tax_rate} for ${new_basket_item.price}`)
            //new_tax_by_state[us_state] = new_tax_by_state[us_state as keyof typeof USTaxState] + tax_amount

            const same_in_basket = new_basket_items.find(item => item.product_id === new_basket_item.product_id)

            if (same_in_basket) { //already in cart
                same_in_basket.num_units += 1
                const totals = reduceTotals(new_basket_items)
                return {
                    ...state,
                    basket_items: new_basket_items,
                    tax_total: parseFloat(totals.tax.toFixed(2)),
                    price_total:  parseFloat(totals.price.toFixed(2)),
                }

            } else {

                new_basket_item.basketItemId = next_item_id
                // if item with this product_id is in, increment
                new_basket_item.num_units = 1
                new_basket_item.tax = tax_amount 

        
                // block double-adds due to React strict mode for useReducer hook
                if (!new_basket_items.find(item => item.item_cart_id === new_basket_item.basketItemId)){
                
                    new_basket_items.push(new_basket_item)
                    const totals = reduceTotals(new_basket_items)

                    return {
                        ...state,
                        next_item_id: next_item_id+1,
                        basket_items: new_basket_items,
                        tax_total: totals.tax,
                        price_total: totals.price
                    }
                        
                } else {
                    console.log(`DUPLICATE, not adding:  ${new_basket_item.basketItemId} `)
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
