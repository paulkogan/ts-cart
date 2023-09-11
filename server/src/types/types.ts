
// Product and OrderItem now under Domain 

export interface TaxByState {
   [key: string]: number
 } 


export interface TypedRequestQuery<T> extends Express.Request {
  query: T
}


export interface TypedRequestBody<T> extends Express.Request {
  body: T
}


export interface GetResponse<T> extends Express.Response {
  data: T | null;
  errors: string | null ;
  message?: string | null;
}


export interface LoginData {
  userid: string;
	password: string;
}
