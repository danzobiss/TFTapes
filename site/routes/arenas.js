var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Classe = require('../models').Classe;
var Arena = require('../models').Arena;
var ArenaFavorita = require('../models').ArenaFavorita;
var env = process.env.NODE_ENV || 'development';

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

router.post('/renderizarArenas', function(req, res, next) {
    console.log('Renderizando arenas');

    let instrucaoSql = `select b.idClasse, b.nmClasse, a.idArena, a.nmArena, a.urlImgArena from arena a join classe b on a.fkClasse = b.idClasse`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: Arena
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/renderizarArenasFavoritadas/idUsuario/:idUsuario', function(req, res, next) {
    console.log('Renderizando estrelas');

    const { idUsuario } = req.params;

    let instrucaoSql = `select * from arenaFavorita where fkUsuario = ${idUsuario}`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: ArenaFavorita
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post("/favoritarArena/idUsuario/:idUsuario/idArena/:idArena", (req, res) => {

    console.log(req.params);
    const { idArena, idUsuario } = req.params;


    let instrucaoSql = `select * from arenaFavorita where fkUsuario = '${idUsuario}' and fkArena ='${idArena}'`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: ArenaFavorita
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        if (resultado.length == 1) {

            let deleteSql = `delete from arenaFavorita where fkUsuario = '${idUsuario}' and fkArena ='${idArena}'`;

            sequelize.query(deleteSql, { model: ArenaFavorita });

        } else if (resultado.length == 0) {

            let insertSql = `insert into arenaFavorita values ('${idUsuario}', '${idArena}')`

            sequelize.query(insertSql, {
                model: ArenaFavorita
            }).then(resultado2 => {
                console.log(`Registro criado: ${resultado2}`)
                res.send(resultado2);
            }).catch(erro => {
                console.error(erro);
                res.status(500).send(erro.message);
            });

        } else {
            res.status(403).send('Usuário votou mais de uma vez na mesma arena');
        }

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });

    console.log(``);



});

router.post('/atualizarRankingArenas', function(req, res, next) {
    console.log('Atualizando ranking');
    let instrucaoSql;

    if (env == 'dev') {
        instrucaoSql = `select count(fkArena), nmArena from arenaFavorita join arena on fkArena = idArena group by fkArena order by count(fkArena) desc limit 3`;

    } else {
        instrucaoSql = `select top 3 count(fkArena), nmArena from arenaFavorita join arena on fkArena = idArena group by fkArena order by count(fkArena) desc`;
    }
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: ArenaFavorita
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

module.exports = router;