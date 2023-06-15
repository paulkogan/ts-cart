//index.js
import {TaxByState} from "../types/types"

export const toDollarString = (amountCents: number) => {
    return (amountCents/100).toFixed(2)
}

export const getTaxRates = ():TaxByState => {

    const taxRates = { 
        "NY": 8.125,
        "AZ": 10.25,
        "FL": 5.0,
        }
    
    return taxRates

}

export const getTaxRateForState= (state:string): number => {

    const taxRates = getTaxRates()
    
    return (taxRates as any)[state]

}
