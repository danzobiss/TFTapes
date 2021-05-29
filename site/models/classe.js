'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Classe = sequelize.define('Classe', {
        idClasse: {
            field: 'idClasse',
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nmClasse: {
            field: 'nmClasse',
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'classe',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return Classe;
};