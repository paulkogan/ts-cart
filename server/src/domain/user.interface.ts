
// creation payload
export interface BaseUser {
    user_uuid: string;
    name: string;
    email: string;
    password: string;
    home_state: string;
  }

export interface User extends BaseUser {
    user_uuid: string;
  }
