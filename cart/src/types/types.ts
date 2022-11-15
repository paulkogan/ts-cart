

export interface Product {
    id: string;
    cart_id: number | null;
    name: string;
    us_state: string;
    imageUrl: string;
    price: number;
    description?: string;
  
  }

 export interface TaxByState {
   [key: string]: number
 } 


export interface CartState {
    num_items: number;
    items_total: number;
    next_cart_id: number, 
    tax_by_state: TaxByState;

}



export const TaxRates = {
  "NY" : 10,
  "AZ" : 5, 
  "FL" : 5 
}