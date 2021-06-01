var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Especie = require('../models').Especie;
var PequenaLenda = require('../models').PequenaLenda;
var PequenaLendaFavorita = require('../models').PequenaLendaFavorita;
var env = process.env.NODE_ENV || 'development';

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


    let index = 0;

    let cadastrando = setInterval(() => {
        let insertSql = `insert into pequenaLenda values ('${lendasJSON[index].itemId}', '${lendasJSON[index].name}','${lendasJSON[index].description}','${lendasJSON[index].loadoutsIcon}','${lendasJSON[index].speciesId}')`;

        sequelize.query(insertSql, {
            model: PequenaLenda
        }).then(resultado => {
            console.log(`Registro criado: ${resultado}`)
            res.send(resultado);
        }).catch(erro => {
            console.error(erro);
            res.status(500).send(erro.message);
        });

        index++;
    }, 2000)





});

router.post('/renderizarPequenasLendas', function(req, res, next) {
    console.log('Renderizando pequenas lendas');

    let instrucaoSql = `select b.idEspecie, b.nmEspecie, a.idPequenaLenda, a.nmPequenaLenda, a.urlImgPequenaLenda from pequenaLenda a join especie b on a.fkEspecie = b.idEspecie order by b.idEspecie`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: PequenaLenda
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/renderizarPequenasLendasFavoritadas/idUsuario/:idUsuario', function(req, res, next) {
    console.log('Renderizando estrelas');

    const { idUsuario } = req.params;

    let instrucaoSql = `select * from pequenaLendaFavorita where fkUsuario = ${idUsuario}`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: PequenaLendaFavorita
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post("/favoritarPequenaLenda/idUsuario/:idUsuario/idPequenaLenda/:idPequenaLenda", (req, res) => {

    console.log(req.params);
    const { idPequenaLenda, idUsuario } = req.params;


    let instrucaoSql = `select * from pequenaLendaFavorita where fkUsuario = '${idUsuario}' and fkPequenaLenda ='${idPequenaLenda}'`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: PequenaLendaFavorita
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        if (resultado.length == 1) {

            let deleteSql = `delete from pequenaLendaFavorita where fkUsuario = '${idUsuario}' and fkPequenaLenda ='${idPequenaLenda}'`;

            sequelize.query(deleteSql, { model: PequenaLendaFavorita });

        } else if (resultado.length == 0) {

            let insertSql = `insert into pequenaLendaFavorita values ('${idUsuario}', '${idPequenaLenda}')`

            sequelize.query(insertSql, {
                model: PequenaLendaFavorita
            }).then(resultado2 => {
                console.log(`Registro criado: ${resultado2}`)
                res.send(resultado2);
            }).catch(erro => {
                console.error(erro);
                res.status(500).send(erro.message);
            });

        } else {
            res.status(403).send('Usuário votou mais de uma vez na mesma pequena lenda');
        }

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });

    console.log(``);



});

router.post('/atualizarRankingPequenasLendas', function(req, res, next) {
    console.log('Atualizando ranking');
    let instrucaoSql;

    if (env == 'dev') {
        instrucaoSql = `select count(fkPequenaLenda), nmPequenaLenda from pequenaLendaFavorita join pequenaLenda on fkPequenaLenda = idPequenaLenda group by fkPequenaLenda order by count(fkPequenaLenda) desc limit 3`;

    } else {
        instrucaoSql = `select top 3 count(fkPequenaLenda), nmPequenaLenda from pequenaLendaFavorita join pequenaLenda on fkPequenaLenda = idPequenaLenda group by nmPequenaLenda order by count(fkPequenaLenda) desc`;
    }
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: PequenaLendaFavorita
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

module.exports = router;