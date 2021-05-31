var express = require('express');
var router = express.Router();
var sequelize = require('../models').sequelize;
var Usuario = require('../models').Usuario;

let sessoes = [];

/* Recuperar usuário por login e senha */
router.post('/autenticar', function(req, res, next) {
    console.log('Recuperando usuário por login e senha');

    var loginBackend = req.body.loginHTML; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senhaLogin = req.body.senhaLoginHTML; // depois de .body, use o nome (name) do campo em seu formulário de login	

    let instrucaoSql = `select * from usuario where nmUsuario='${loginBackend}' and senha='${senhaLogin}'`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: Usuario
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        if (resultado.length == 1) {
            sessoes.push(resultado[0].dataValues.loginBackend);
            console.log('sessoes: ', sessoes);
            res.json(resultado[0]);
        } else if (resultado.length == 0) {
            res.status(403).send('Login e/ou senha inválido(s)');
        } else {
            res.status(403).send('Mais de um usuário com o mesmo login e senha!');
        }

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

/* Cadastrar usuário */
router.post('/cadastrar', function(req, res, next) {
    console.log('Criando um usuário');

    Usuario.create({
        nmUsuario: req.body.cadastroHTML,
        senha: req.body.senhaCadastroHTML,
        maiorPont: 0
    }).then(resultado => {
        console.log(`Registro criado: ${resultado}`)
        res.send(resultado);
    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/atualizarPontuacao/idUsuario/:idUsuario/maiorPont/:maiorPont', function(req, res, next) {
    console.log('Atualizando pontuação máxima');
    const { idUsuario, maiorPont } = req.params;

    let instrucaoSql = `update usuario set maiorPont = ${maiorPont} where idUsuario = ${idUsuario}`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: Usuario
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

router.post('/renderizarPontuacao/idUsuario/:idUsuario', function(req, res, next) {
    console.log('Renderizando pontuação máxima');
    const { idUsuario } = req.params;

    let instrucaoSql = `select maiorPont from usuario where idUsuario = ${idUsuario}`;
    console.log(instrucaoSql);

    sequelize.query(instrucaoSql, {
        model: Usuario
    }).then(resultado => {
        console.log(`Encontrados: ${resultado.length}`);

        res.json(resultado);

    }).catch(erro => {
        console.error(erro);
        res.status(500).send(erro.message);
    });
});

module.exports = router;