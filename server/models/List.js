module.exports = (sequelize, DataTypes) => {

    const BuddyList = sequelize.define("BuddyList", {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return BuddyList;
}