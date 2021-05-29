var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Classe = require('../models').Classe;
var Arena = require('../models').Arena;

const arenasJSON = require("../json/tftmapskins.json");

router.post("/cadastrarClasse", (req, res) => {

    var instrucaoSql = "";

    // Na variável abaixo, coloque o Insert que será executado no Workbench
    // salvo exceções, é igual a SQL Server
    let aux = -1;
    for (let index = 0; index < arenasJSON.length; index++) {
        if (arenasJSON[index].groupId == aux) {
            //não cadastra
        } else {
            Classe.create({
                idClasse: arenasJSON[index].groupId,
                nmClasse: arenasJSON[index].groupName
            }).then(resultado => {
                console.log(`Registro criado: ${resultado}`)
                res.send(resultado);
            }).catch(erro => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
            console.log(`id: ${arenasJSON[index].groupId}   nome: ${arenasJSON[index].groupName}`);
            aux = arenasJSON[index].groupId;
        }

    }

});

module.exports = router;