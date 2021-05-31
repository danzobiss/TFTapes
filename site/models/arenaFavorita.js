'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let ArenaFavorita = sequelize.define('ArenaFavorita', {
        fkUsuario: {
            field: 'fkUsuario',
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        fkArena: {
            field: 'fkArena',
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {
        tableName: 'arenaFavorita',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return ArenaFavorita;
};