module.exports = (sequelize, DataTypes) => {

    const BuddiePreference = sequelize.define("BuddiePreference", {
        type: {
            // species, type, age, disposition
            type: DataTypes.STRING,
            allowNull: false
        },
        preference: {
            // e.g. when type species -> dog
            type: DataTypes.STING,
            allowNull: false
        }
    });

    return BuddiePreference;
}