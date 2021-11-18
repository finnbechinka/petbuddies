module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define("Message", {
        content: {
            type: DataTypes.STRING(3000),
            allowNull: false
        }
    });

    return Message;
}