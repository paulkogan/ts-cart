//index.js
import {TaxByState} from "../types/types"

const buffWithZero = (rawNum: number): string => {
    return rawNum < 10 ? "0"+rawNum : rawNum.toString()
}

export const expToRemainingHMS = (expMillis: number): string => {
    const remainingSecs = Math.floor((expMillis*1000-Date.now())/1000)
    const inPast = remainingSecs < 0 ? true : false
    //const absRemainSecs = (2*60*60)+(11*60)+15
    const absRemainSecs = Math.abs(remainingSecs)
    const minutes = Math.floor(absRemainSecs/60)
    const hoursToDisplay = Math.floor(minutes/60)
    const minutesToDisplay = minutes%60
    const secondsToDisplay = absRemainSecs%60
    
    const timeString = `${buffWithZero(hoursToDisplay)}:${buffWithZero(minutesToDisplay)}:${buffWithZero(secondsToDisplay)}`

    return inPast ? "expired "+timeString+" ago" : "expires in "+timeString

 
} 

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
