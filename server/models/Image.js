module.exports = (sequelize, DataTypes) => {

    const Image = sequelize.define("Image", {
        file: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Image;
};