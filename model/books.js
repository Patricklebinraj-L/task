

const books = (sequelize, DataTypes) => {

    const table = sequelize.define("books", {

        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

    })

    return table
}


module.exports = books
