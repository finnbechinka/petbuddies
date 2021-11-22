module.exports = (sequelize, DataTypes) => {

    const BuddyList = sequelize.define("BuddyList", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    return BuddyList;
};