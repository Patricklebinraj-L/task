const users = (sequelize, DataTypes) => {

    const table = sequelize.define("users", {

        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true

        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        },

    })

    return table
}



module.exports = users
