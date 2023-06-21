
const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js");
const User = models.User;
const Op = Sequelize.Op;

//import { v4 as uuidv4 } from 'uuid';
import {generateToken} from '../services/auth-service'


const verifySession = async (req, res) => {
    console.log(`Auth cont - VERIFY SESSION ======= `)
    return res.json({ 
        //session: "this is session",
        session: req.session,
        token: "abcd"
    });

}

const loginUser = async (req, res) => {
    let success = false
    //console.log(`LOGIN BODY ======= ${JSON.stringify(req.body)}`)
    const tryEmail = req.body.userid
    const tryPassword = req.body.password


    if (!tryEmail || !tryPassword) {
        return res.status(404).json({
            data: null,
            errors: `Missing Logon credentials`, 
            message: 'Missing Logon credentials'
          });
    }
    
    const matchUser = await User.findByEmail(tryEmail)

    if (matchUser && (tryPassword == matchUser.password)) {
            success = true
    }

    if (success) {
        // user = utils.getCleanUser(user);
        const returnUser = {
            name: matchUser.name,
            email: matchUser.email,
            home_state: matchUser.home_state, 
            user_uuid: matchUser.user_uuid
        }

        var token = generateToken(matchUser);

        /**res.cookie('token', token, { 
         *  httpOnly: true, 
         *  secure: prod? true, // cookie only works in https
         *  SameSite: "none", // allow 3rd party sites, but requires secure https not for local use
         *  domain: __prod__ ? ".kreddit.vercel.app" : undefined,

         **/


        res.cookie('token', token, { 
            httpOnly: true,
         });

        return res.status(200).json({
            data: {user: returnUser, token},
            errors: null, 
            message: `Login Successful for ${returnUser.name}`
          });

    } else {
        return res.status(401).json({
            data: null,
            errors: `Login failed for ${tryEmail}`, 
            message: 'Username or Password is Wrong'
          });
    }


    // bcrypt.compare(req.body.password, user.password, <-- check pwd         
    //     function(err, valid) {
    //       if (!valid) {
    //        return res.status(404).json({
    //                error: true,
    //                message: ‘Username or Password is Wrong’
    //          });
    //       }




}




export default {loginUser, verifySession}