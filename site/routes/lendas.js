var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Especie = require('../models').Especie;
var PequenaLenda = require('../models').PequenaLenda;

const lendasJSON = require("../json/companions.json");

router.post("/cadastrarEspecie", (req, res) => {

    let aux = -1;
    for (let index = 0; index < lendasJSON.length; index++) {
        if (lendasJSON[index].speciesId == aux) {
            //não cadastra
        } else {
            Especie.create({
                idEspecie: lendasJSON[index].speciesId,
                nmEspecie: lendasJSON[index].speciesName
            }).then(resultado => {
                console.log(`Registro criado: ${resultado}`)
                res.send(resultado);
            }).catch(erro => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
            console.log(`id: ${lendasJSON[index].speciesId}   nome: ${lendasJSON[index].speciesName}`);
            aux = lendasJSON[index].speciesId;
        }

    }

});

router.post("/cadastrarPequenaLenda", (req, res) => {

    for (let index = 0; index < lendasJSON.length; index++) {
        setTimeout(() => {
            PequenaLenda.create({
                idPequenaLenda: lendasJSON[index].itemId,
                nmPequenaLenda: lendasJSON[index].name,
                descricao: lendasJSON[index].description,
                urlImgPequenaLenda: lendasJSON[index].loadoutsIcon,
                fkEspecie: lendasJSON[index].speciesId
            }).then(resultado => {
                console.log(`Registro criado: ${resultado}`)
                res.send(resultado);
            }).catch(erro => {
                console.error(erro);
                res.status(500).send(erro.message);
            });
            console.log(`id: ${lendasJSON[index].itemId}\nnome: ${lendasJSON[index].name}\ndesc: ${lendasJSON[index].description}\nurl: ${lendasJSON[index].loadoutsIcon}\nfk: ${lendasJSON[index].speciesId}\n\n`);
        }, 1000);

    }

});

module.exports = router;