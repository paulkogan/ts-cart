import {
	User } from "../domain/user.interface"




//creation payload
export interface BaseProduct {
    name: string;
    image_url: string;
    description?: string;

  
}

export interface NewProductPayload extends BaseProduct{
    price: string;
    inventory: string;
  
}



export interface CreatedProduct extends BaseProduct{
    product_id: string;
    price: number;
    inventory: number;

}

//creation payload
export interface BaseOrderItem extends NewProductPayload{
    product_id: string;
    order_uuid: string;
    num_units: number;
    cost: number; //total cost
    tax: number;  //total tax
    
}


export interface CreatedOrderItem extends BaseOrderItem{
    order_item_uuid: string | null;
    order_item_status: string;  
}


export interface BaseOrder {
    user_uuid: string;
    date_placed: Date;
    delivery_us_state: string;
    items_total: number;
    tax_total: number;
    shipping_total: number;  
    order_status: string;
    customer: User;
}

export interface ReadyOrder extends BaseOrder{
    order_uuid: string;
}



export interface NewOrder extends BaseOrder{
    order_items: CreatedOrderItem[];
}



export interface CreatedOrder extends BaseOrder{
    order_uuid: string;
    order_items: CreatedOrderItem[];
}
