module.exports = (sequelize, DataTypes) => {

    const test = sequelize.define("test", {
        title: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })

    return test
}