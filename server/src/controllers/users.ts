
const Sequelize = require("sequelize");
const {models, sequelize} = require("../models/index.js");
const User = models.User;
const Op = Sequelize.Op;

import { v4 as uuidv4 } from 'uuid';
import generateToken from '../services/auth'

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

        return res.status(200).json({
            data: {user: returnUser, token},
            errors: null, 
            message: `Login Successful for ${returnUser.name}`
          });

    } else {
        return res.status(404).json({
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

const registerNew = async (req, res) => {

    var validEmailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-\.]+$/;

    if (!req.body.email.match(validEmailRegex)) {
        res.status(400).send({
            message: `Error (400): invalid email  ${req.body.email}`
          });
        return  
    }

    let new_user = {
        user_uuid: uuidv4(),
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        avatar_url: null,
        home_state: req.body.home_state
    }
    // console.log(`New User OBJECT is: ${JSON.stringify(new_user)}`)


    User.registerNew(new_user)
    .then(data => {
        if (data) {
            console.log(`\n\nSUCCESS BE: New User registered with: ${JSON.stringify(data)}`)
            res.send(data);
        } else {
            console.log(`\n\nFAIL BE: Did not register new user with  ${new_user.email}`)
            res.status(400).send({
                message: `Error (400): Did not register new user with   ${new_user.email}`
              });
        }

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while registering user"
        });
    });

}

const listUsers = async (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
    .then(data => {
        res.status(200).send({
            "data":data,
            "errors": null
        });
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving users."
        });
    });
}


const findUser = async (req, res) => {
    var target_email = req.body.email;
    console.log(`User target_email is ${target_email}`)
    const user_email_param = req.params.email;

    User.findByEmail(target_email)
    .then(data => {
        if (data) {
            console.log(`Found user ${JSON.stringify(data)}`)
            res.status(200).send({
                "data":data,
                "errors": null     
            });
        } else {
            console.log(`Did not find user ${target_email}`)
            res.status(404).send({
                "data": null,
                "errors": `Did not find user with  ${target_email}`, 
                "message": `ERROR: Did not find user with ${target_email}`
              });
        }

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while finding User by email"
        });
    });

}

export default {listUsers, findUser, registerNew, loginUser}