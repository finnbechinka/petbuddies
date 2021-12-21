module.exports = (sequelize, DataTypes) => {

    const BuddyList = sequelize.define("BuddyList", {
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ownerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        buddieId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { freezeTableName: true });

    return BuddyList;
};