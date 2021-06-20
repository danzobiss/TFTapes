const dadosConfidenciais = require("../json/dadosConfidenciais.json");

module.exports = {
    // Insira aqui seus dados do banco NA NUVEM AZURE
    production: {
        // altere APENAS username, password, database e host.
        username: dadosConfidenciais.production.username,
        password: dadosConfidenciais.production.password,
        database: dadosConfidenciais.production.database,
        host: dadosConfidenciais.production.host,
        dialect: 'mssql',
        xuse_env_variable: 'DATABASE_URL',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 5000,
            idle: 30000,
            connectTimeout: 5000
        }
    },

    // Insira aqui seus dados do banco LOCAL - MySQL Workbench
    dev: {
        // altere APENAS username, password e database.
        username: dadosConfidenciais.dev.username,
        password: dadosConfidenciais.dev.password,
        database: dadosConfidenciais.dev.database,
        host: '127.0.0.1',
        dialect: 'mysql',
        xuse_env_variable: 'DATABASE_URL',
        dialectOptions: {
            options: {
                encrypt: true
            }
        },
        pool: {
            max: 5,
            min: 1,
            acquire: 5000,
            idle: 30000,
            connectTimeout: 5000
        }
    },
};