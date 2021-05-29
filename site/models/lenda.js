'use strict';

/* 
lista e explicação dos Datatypes:
https://codewithhugo.com/sequelize-data-types-a-practical-guide/
*/

module.exports = (sequelize, DataTypes) => {
    let PequenaLenda = sequelize.define('PequenaLenda', {
        idPequenaLenda: {
            field: 'idPequenaLenda',
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        nmPequenaLenda: {
            field: 'nmPequenaLenda',
            type: DataTypes.STRING,
            allowNull: false
        },
        descricao: {
            field: 'descricao',
            type: DataTypes.TEXT,
            allowNull: false
        },
        urlImgPequenaLenda: {
            field: 'urlImgPequenaLenda',
            type: DataTypes.STRING,
            allowNull: false
        },
        fkEspecie: {
            field: 'fkEspecie',
            type: DataTypes.INTEGER,
            allowNull: false,
            foreignKey: true
        }
    }, {
        tableName: 'pequenaLenda',
        freezeTableName: true,
        underscored: true,
        timestamps: false,
    });

    return PequenaLenda;
};