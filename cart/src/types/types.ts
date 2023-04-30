

export interface Product {
    product_id: string | null;
    name: string;
    image_url: string;
    price: number;
    description?: string;
    inventory: number;
  
}
// 
export interface OrderItem extends Product{
    order_item_uuid: string | null;
    item_cart_id: number;
    product_id: string;
    order_uuid: string;
    num_units: number;
    cost: number;
    tax: number;
    order_item_status: string;
}




export interface TaxByState {
   [key: string]: number
 } 


export interface CartState {
    cart_id: string | undefined;
    user_uuid: string | undefined;
    next_item_id: number,
    basket_items: OrderItem[];
    delivery_us_state: string | undefined,  
    us_tax_rates: TaxByState | {} | any;
    price_total: number,
    tax_total: number
}



export interface Order {
    order_uuid: string;
    user_uuid: string;
    date_placed: Date;
    delivery_us_state: string;
    items_total: number;
    tax_total: number;
    shipping_total: number;  
    order_status: string;
    order_items: OrderItem[];
    customer: User;
}



export interface User {
  user_uuid: string;
  name: string;
  email: string;
  password: string;
  home_state: string | null;
}
