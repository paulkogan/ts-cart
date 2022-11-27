

export interface Product {
    product_id: string;
    name: string;
    imageUrl: string;
    price: number;
    description?: string;
  
}

export interface BasketItem extends Product{
    basket_item_id: number;
    num_items: number;
    tax: number;
    discount?: number;
}

 

export interface TaxByState {
   [key: string]: number
 } 


export interface CartState {
    cart_id: string | undefined;
    user_id: string | undefined;
    next_item_id: number,
    basket_items: BasketItem[];
    delivery_us_state: string | undefined,  
    tax_by_state: TaxByState;
    us_tax_rates: TaxByState | {} | any;

}

export interface OrderItem extends Product{
  order_item_id: number;
  order_id: string
  num_items: number;
  tax: number;
  discount?: number;
}


export interface Order {
    order_uuid: string;
    user_uuid: string;
    date_placed: Date;
    delivery_us_state: string;
    total_amount: number;
    total_tax: number; 
    order_status: string;
    order_items: OrderItem[];
}



export interface User {
  user_uuid: string;
  name: string;
  email: string;
  password: string;
}
