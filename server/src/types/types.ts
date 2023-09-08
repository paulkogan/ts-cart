
// Product and OrderItem now under Domain 

// import {CreatedOrderItem } from "../domain/product.interface"
// import {User} from "../domain/user.interface"

export interface TaxByState {
   [key: string]: number
 } 



export interface TypedRequestBody<T> extends Express.Request {
  body: T
}

export interface LoginData {
  userid: string;
	password: string;
}

export interface LoginRequestBody<LoginData> extends Express.Request {
  body: LoginData;
}

export interface LogoutUserData {
  email: string;
}

export interface LogoutRequestBody extends Express.Request {
  body: {
    user: string;
  };
}
