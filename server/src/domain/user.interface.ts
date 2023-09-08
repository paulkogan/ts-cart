
// creation payload
export interface BaseUser {
    name: string;
    email: string;
    home_state: string;
  }

export interface TokenUser extends BaseUser {
    user_uuid: string;
}


export interface CreateUser extends BaseUser {
    password: string;
    avatar_url: string;
  }


export interface User extends BaseUser {
    user_uuid: string;
    avatar_url: string;
  }
