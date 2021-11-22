module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define("Message", {
        content: {
            type: DataTypes.STRING(3000),
            allowNull: false
        }
    }, { freezeTableName: true });

    Message.associate = (models) => {
        Message.belongsTo(models.Profile, { as: 'recipient' });
    };

    return Message;
};