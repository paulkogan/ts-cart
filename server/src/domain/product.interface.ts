//creation payload
export interface BaseProduct {
    name: string;
    image_url: string;
    price: number;
    description?: string;
    inventory: number;
  
}

export interface Product extends BaseProduct{
    product_id: string;

}

//creation payload
export interface BaseOrderItem extends Product{
    order_uuid: string;
    num_units: number;
    cost: number; //total cost
    tax: number;  //total tax
    
}


export interface OrderItem extends BaseOrderItem{
    order_item_uuid: string | null;
    order_item_status: string;  
}
