require("dotenv").config()
const { v4: uuid } = require("uuid")
const jwt = require("jsonwebtoken")
const helper = require("../helper/helper.js")
const validation = require("../validation/validation.js")
const model = require("../model/db.js")

const signup = async (req, res) => {

    try{
    const {users} = await model()
    const obj = {
        id: uuid(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    if (obj.role == "Admin") {
        res.send({
            msg: "Admin is invalid role",
            err: true
        })
        return;
    }

    if (validation.emailValid(obj.email)) {
        res.send({
            msg: "Email is invalid !",
            err: true
        })
        return;
    }

    if (validation.passwordValid(obj.password)) {
        res.send({
            msg: "Password length should be 3 to 10 !",
            err: true
        })
        return;
    }

    if (validation.nameValid(obj.name)) {
        res.send({
            msg: "Name is invalid !",
            err: true
        })
        return;
    }

    const emailAvail = await users.findOne({ where: { email: obj.email } })
    if (emailAvail) {

        res.send({
            msg: "Email already exists !",
            err: true
        })
        return;

    }
    else {

        helper.encrypt(obj.password, async (hash) => {

            obj.password = hash
            const q = await users.create(obj)
            if (q) {
                res.send({
                    msg: "Successfully signed up!",
                    err: false
                })
            }
            else {
                res.send({
                    msg: "Something went wrong!",
                    err: false
                })
            }
        })

    }

}
catch(e){
    res.send({
        msg:"Something went wrong!",
        err:true
    })
}

}

const login = async (req, res) => {

    try{

    const {users} = await model()

    let email = req.body.email
    let password = req.body.password


    const q = await users.findOne({ where: { email: email } })
    if (q) {

        helper.decrypt(password, q['password'], (r) => {
            if (r) {

                const token = jwt.sign({ email: email, name: q['name'], role: q['role'] },process.env.SECRET_KEY, { expiresIn: "6h" })
                res.send({
                    msg: "logged in!",
                    err: false,
                    token: token
                })

            }
            else {
                res.send({
                    msg: "Password is incorrect!",
                    err: true
                })
            }
        })
    }
    else {
        res.send({
            msg: "Email is not found!",
            err: true
        })
    }
    }

catch(e){
    res.send({
        msg:"Something went wrong!",
        err:true
    })
}

}

module.exports = {
    signup: signup,
    login: login

}