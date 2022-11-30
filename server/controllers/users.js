
import db from '../models/index.cjs'
const User = db.users;
const Op = db.Sequelize.Op;

//import { randomUUID } from 'crypto'
import { v4 as uuidv4 } from 'uuid';


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
    }
    // console.log(`New User OBJECT is: ${JSON.stringify(new_user)}`)


    User.registerNew(new_user)
    .then(data => {
        if (data) {
            console.log(`SUCCESS: New User registered with: ${JSON.stringify(data)}`)
            res.send(data);
        } else {
            console.log(`FAIL: Did not register new user with  ${new_user.email}`)
            res.status(400).send({
                message: `Error (400): Did not register new user with   ${new_user.email}`
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

const listUsers = async (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
    .then(data => {
        res.send(data);
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
            console.log(`Found user ${data}`)
            res.send(data);
        } else {
            console.log(`Did not find user with  ${target_email}`)
            res.status(404).send({
                message: `Did not find user with  ${target_email}`
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

export default {listUsers, findUser, registerNew}