const model = require("../model/db.js")

const { v4: uuid } = require("uuid")

const createBook = async (req, res) => {

    const {books} = await model()

    try {

        const obj = {

            id: uuid(),
            name: req.body.name,
            author: req.body.author,
            year: req.body.year,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock

        }


        const q = await books.create(obj)
        if(q){

            res.send({
                msg: "Book created successfully!",
                err: false
            })

        }
        else {


            res.send({
                msg: "Book not created!",
                err: true
            })



        }


    }

    catch (e){
        res.send({
            msg: "Something went wrong!",
            err: true
        })
    }


}




const updateBook = async (req, res) => {

    try {

        const {books} = await model()

        const obj = {

            id: req.params.id,
            name: req.body.name,
            author: req.body.author,
            year: req.body.year,
            category: req.body.category,
            price: req.body.price,
            stock: req.body.stock

        }

        let keys = {}
        for (let [i, j] of Object.entries(obj)){
            if(j){
                keys[i] = j
            }
        }


        const q = await books.update(keys, {
            where: {
                id: obj.id,
            },
        });

        if(q){

            res.send({
                msg: "Book updated successfully!",
                err: false
            })

        }
        else {


            res.send({
                msg: "Book not found!",
                err: true
            })



        }


    }
    catch (e){
        res.send({
            msg: "Something went wrong!",
            err: true
        })
    }

}




const deleteBook = async (req, res) => {

    try {

        const {books} = await model()

        let id = req.params.id

        const q = await books.destroy({ where: { id: id } })
        if(q){

            res.send({
                msg: "Book deleted successfully!",
                err: false
            })

        }
        else {


            res.send({
                msg: "Book not found!",
                err: true
            })



        }



    }
    catch (e){
        res.send({
            msg: "Something went wrong!",
            err: true
        })
    }

}



const getBook = async (req, res) => {

    try {

        const {books} = await model()

        let id = req.params.id

        const q = await books.findOne({ where: { id: id } })
        if(q){

            res.send(q)

        }
        else {


            res.send({
                msg: "Book not found!",
                err: true
            })



        }


    }
    catch (e){
        res.send({
            msg: "Something went wrong!",
            err: true
        })
    }


}



const getAllBook = async (req, res) => {

    const {books} = await model()

    try {


        let limit = parseInt(req.query.limit)
        let offset = parseInt(req.query.offset)


        let obj = {
            "total_items": 0,
            "response": null,
            "total_pages": 0,
            "current_page": 0,
            "hasMore": false
        }




        const q = await books.findAll({ limit: limit, offset: offset })
        if(q){

            const booksRow = await books.findAll()

            let resCount = q.length
            let totalRow = booksRow.length

            obj.total_items = resCount
            obj.total_pages = Math.ceil(totalRow / limit)
            let x = 1;
            for (let h = limit; h <= totalRow; h += limit){
                // console.log(`till ${h}th page ====> ${x}  `)
                if(h > offset){
                    break
                }
                x += 1
            }
            obj.current_page = x
            obj.hasMore = (obj.total_pages) - (obj.current_page) > 0 ? true : false
            obj.response = q

            res.send(obj)

        }
        else {


            res.send({
                msg: "cannot get books!",
                err: true
            })



        }

    }
    catch (e){
        res.send({
            msg: "Something went wrong!",
            err: true
        })
    }


}




module.exports = {
    createBook: createBook,
    updateBook: updateBook,
    deleteBook: deleteBook,
    getBook: getBook,
    getAllBook: getAllBook
}