

export interface Product {
    product_id: string;
    name: string;
    imageUrl: string;
    price: number;
    description?: string;
  
  }

  export interface BasketItem extends Product{
    cart_id: number | null;
    num_items: number;
    tax: number;
    discount?: number;
    shipping?: number;
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
    basket_items: BasketItem[];
    next_cart_id: number,
    buyer_state: string | undefined,  
    tax_by_state: TaxByState;
    us_tax_rates: TaxByState | {} | any;

}


