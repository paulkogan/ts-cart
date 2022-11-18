

export interface Product {
    product_id: string;
    name: string;
    imageUrl: string;
    price: number;
    description?: string;
  
  }

  export interface BasketItem extends Product{
    cart_id: number | null;
    count: number;
    us_state: string;
    tax: number
    discount?: number
  }

  // export interface USTaxState {
  //    state_abbr: string;
  //    state_name: string;
  //    tax_rate: number
  // } 
 

 export interface TaxByState {
   [key: string]: number
 } 


export interface CartState {
    num_items: number;
    items_total: number;
    next_cart_id: number, 
    tax_by_state: TaxByState;
    us_tax_rates: any;

}


