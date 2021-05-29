var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Classe = require('../models').Classe;
var Arena = require('../models').Arena;

const arenasJSON = require("../json/tftmapskins.json");

router.post("/cadastrarClasse", (req, res) => {

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

router.post("/cadastrarArena", (req, res) => {

    for (let index = 0; index < arenasJSON.length; index++) {

        Arena.create({
            idArena: arenasJSON[index].itemId,
            nmArena: arenasJSON[index].name,
            urlImgArena: arenasJSON[index].loadoutsIcon,
            fkClasse: arenasJSON[index].groupId
        }).then(resultado => {
            console.log(`Registro criado: ${resultado}`)
            res.send(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });
        console.log(`id: ${arenasJSON[index].itemId}\nnome: ${arenasJSON[index].name}\nurl: ${arenasJSON[index].loadoutsIcon}\nfk: ${arenasJSON[index].groupId}\n\n`);

    }

});

module.exports = router;