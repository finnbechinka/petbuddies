module.exports = (sequelize, DataTypes) => {

    const BuddyPreference = sequelize.define("BuddyPreference", {
        type: {
            // species, type, age, disposition
            type: DataTypes.STRING,
            allowNull: false
        },
        preference: {
            // e.g. when type species -> dog
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    return BuddyPreference;
};