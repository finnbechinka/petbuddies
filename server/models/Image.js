module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define("Image", {
        file: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { freezeTableName: true });

    return Image;
};