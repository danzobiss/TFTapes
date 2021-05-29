'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let Especie = sequelize.define('Especie', {
        idEspecie: {
            field: 'idEspecie',
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nmEspecie: {
            field: 'nmEspecie',
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'especie',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return Especie;
};