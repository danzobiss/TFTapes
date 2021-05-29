'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Arena = sequelize.define('Arena', {
        idArena: {
            field: 'idArena',
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nmArena: {
            field: 'nmArena',
            type: DataTypes.STRING,
            allowNull: false
        },
        urlImgArena: {
            field: 'urlImgArena',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkClasse: {
            field: 'fkClasse',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, {
        tableName: 'arena',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return Arena;
};