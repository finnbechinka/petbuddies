module.exports = (sequelize, DataTypes) => {

    const Profile = sequelize.define("Profile", {
        // sprache in welcher das profil verfasst ist
        sprache: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        // beinhaltet die image id aus dem image table
        profile_img: {
            type: DataTypes.INT,
            allowNull: true,
        },
        beschreibung: {
            type: DataTypes.STRING(2000),
            allowNull: true,
        }

        // TODO: Braucht noch merkmale, aber format noch nicht bekannt
        // TODO: Braucht noch praeferenzen, aber format nocht nicht bekannt, vllt so wie merkmale?
    })

    return Profile
}