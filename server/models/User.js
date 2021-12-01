const Profile = require("./Profile");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            // privat, institution, verwalter
            type: DataTypes.STRING,
            allowNull: true
        }
    }, { freezeTableName: true });

    User.associate = (models) => {
        User.hasMany(models.Profile);
        User.belongsToMany(models.Profile, { through: 'UserToProfile' });
    };

    return User;
};