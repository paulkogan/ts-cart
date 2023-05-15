//index.js

export const toDollarString = (amountCents: number) => {
    return (amountCents/100).toFixed(2)
}