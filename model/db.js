require("dotenv").config()
const { Op, Sequelize, DataTypes } = require("sequelize")
const bookTable = require("./books")
const userTable = require("./users")

const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASSWORD,

    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
)


const users = userTable(sequelize, DataTypes)
const books = bookTable(sequelize, DataTypes)



const Models = {
    Op,
    users,
    books
}

// sequelize.sync();
// sequelize.authenticate();
// console.log('=> Connection started...');


// module.exports = Models

const connection = {}

module.exports = async function(){

    // return new Promise(async function(res,rej){

        if (connection.isConnected) {
            console.log('=> Using existing connection.')
            return(Models)
        }
        await sequelize.sync();
        await sequelize.authenticate();
        connection.isConnected = true;
        console.log('=> Created a new connection.')
        return(Models)

    // })

}
