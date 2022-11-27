
const db = require('../models/index.cjs')
const User = db.users;
const Op = db.Sequelize.Op;



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

module.exports = {listUsers, findUser}