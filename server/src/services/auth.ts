

import jsonWebToken from 'jsonwebtoken'   
import 'dotenv/config'

const generateToken = (user) => {
  //1. Dont use password and other sensitive fields
  //2. Use fields that are useful in other parts of the     


  const returnUser = {
    name: user.name,
    email: user.email,
    home_state: user.home_state, 
    user_uuid: user.user_uuid
  }
  const secret = process.env.JWT_SECRET || "abcd";
  const hours24 =  60 * 60 * 24
  const minutes5 = 60 * 5

  const token = jsonWebToken.sign(returnUser, secret, {
     expiresIn: minutes5
  });
  return token
}

export default generateToken