module.exports = (sequelize, DataTypes) => {

    const Profile = sequelize.define("Profile", {
        // sprache in welcher das profil verfasst ist
        language: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(2000),
            allowNull: true
        },
        species: {
            // z.b.: Hund
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            // z.b.: Bulldogge
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INT,
            allowNull: true
        },
        disposition: {
            // gemuet
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Profile.assotiate = (models) => {
        Profile.hasMany(models.Image, { onDelete: "cascade" } );
        Profile.belongsTo(models.Image, { as: 'ProfilePicture', constrains: false } );
        Profile.hasMany(models.BuddiePreference, { onDelete: "cascade"} );
    };

    return Profile;
}