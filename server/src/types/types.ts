

export interface Product {
    product_id: string | null;
    name: string;
    image_url: string;
    price: number;
    description?: string;
    inventory: number;
  
}

export interface OrderItem extends Product{
    item_cart_id: number;
    product_id: string;
    order_uuid: string
    num_units: number;
    tax: number; //total tax
    cost: number; //total cost
    order_item_status: string;
    discount?: number;
}


export interface TaxByState {
   [key: string]: number
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
