'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let PequenaLendaFavorita = sequelize.define('PequenaLendaFavorita', {
        fkUsuario: {
            field: 'fkUsuario',
            type: DataTypes.INTEGER,
            foreignKey: true
        },
        fkPequenaLenda: {
            field: 'fkPequenaLenda',
            type: DataTypes.INTEGER,
            foreignKey: true
        }
    }, {
        tableName: 'pequenaLendaFavorita',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return PequenaLendaFavorita;
};