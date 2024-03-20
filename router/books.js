require("dotenv").config()
const router = require("express").Router()
const controller = require("../controller/books")
const jwt = require("jsonwebtoken")

const check = (req, res, next) => {
    const header = req.headers['authorization']
    const token = header && header.split(' ')[1]
    if (!token) {
        return res.send({
            msg: 'Please login!',
            err: true
        })
    }
    jwt.verify(token, process.env.SECRET_KEY , (err, decoded) => {
        if (err) {
            return res.send({
                msg: 'Invalid token!',
                err: true
            })
        }
        res.obj = decoded
        next()
    })
}

const authorize = (req, res, next) => {

    const staff_methods = ['GET', 'POST', 'PUT']
    const user_methods = ['GET', 'POST']
    if (res.obj.role == "Reader") {
        if (user_methods.includes(req.method)) {

            next()
        }
        else {
            res.send({
                msg: "You are not allowed to make changes over the books!",
                err: true
            })
        }
    }
    else if (res.obj.role == "Staff") {
        if (staff_methods.includes(req.method)) {
            next()
        }
        else {
            res.send({
                msg: "You are not allowed to delete the books!",
                err: true
            })
        }
    }
    else {
        next()
    }
}

router.post("/create", check, authorize, controller.createBook)
router.get("/all", check, authorize, controller.getAllBook)
router.get("/id/:id", check, authorize, controller.getBookByID)
router.get("/name", check, authorize, controller.getBookByName)
router.put("/update/:id", check, authorize, controller.updateBook)
router.delete("/delete/:id", check, authorize, controller.deleteBook)

module.exports = router