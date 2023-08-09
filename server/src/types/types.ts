
// Product and OrderItem now under Domain 

import {OrderItem } from "../domain/product.interface"
import {User} from "../domain/user.interface"

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


