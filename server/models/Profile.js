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
        Profile.hasMany(models.Image, { onDelete: 'cascade' } );
        Profile.belongsTo(models.Image, { as: 'profile_picture', constrains: false } );
        Profile.hasMany(models.BuddyPreference, { onDelete: 'cascade'} );
        Profile.hasMany(models.Message, { onDelete: 'cascade'});
        Profile.belongsTo(models.Message, { as: 'recipient_profile_id'});
        Profile.hasMany(models.BuddyList, { onDelete: 'cascade'});
        Profile.belongsTo(models.BuddyPreference, { as: 'buddie', onDelete: 'cascade'});
    };

    return Profile;
}