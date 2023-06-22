

import jsonWebToken from 'jsonwebtoken'   
import 'dotenv/config'

export const generateToken = (user) => {
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

export const authorization = async (req, res, next) => {
  const token = req.cookies.tsToken;
  if (!token) {
    return res.status(401).send('Authorization Error: no token present in cookies');
  }
  try {
    const secret = await process.env.JWT_SECRET;
    const data = secret ? jsonWebToken.verify(token, secret) : null
    req.session = data

    return next();
  } catch {
    return res.status(401).send('Authorization Error: cookies token not verified or expired');
  }
};



//export default generateToken