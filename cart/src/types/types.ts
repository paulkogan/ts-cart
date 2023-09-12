import React, { Dispatch, SetStateAction} from 'react';

export interface Product {
    product_id: string | null;
    name: string;
    image_url: string;
    price: number;
    description?: string;
    inventory: number | null;
  
}
// 
export interface OrderItem extends Product{
    order_item_uuid: string | null;
    product_id: string;
    order_uuid: string;
    num_units: number;
    cost: number; //total cost
    tax: number;  //total tax
    order_item_status: string;
}


export interface TaxByState {
   [key: string]: number
 } 

//this is a singleton object. Configured correctly?
export interface CartState {
    user_uuid: string | undefined;
    basket_items: OrderItem[];
    delivery_us_state: string | undefined,  
    price_total: number,
    tax_total: number, 
    user_message: string
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


interface hookResponse {
    status: number | string;
    data?: any | null
    message?: any | null
}


export interface CartStateContextType { 
    cartState: CartState; 
    updateCartDispatch: React.Dispatch<{ type: string; payload: object; }>; 
    auth: { 
        authUser: { name: string; home_state: string; }, 
        hasValidSessionHook: () => boolean; 
        setAuthUser: Dispatch<SetStateAction<{ name: string; home_state: string; }>>;
        handleLoginHook: (login: any, password: any) => Promise<hookResponse>;
        verifySessionWithBEHook: (path: any) => Promise<hookResponse>; 
        handleLogoutHook: () => Promise<hookResponse>; 
    };
}
