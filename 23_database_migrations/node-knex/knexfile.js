// Update with your config settings.
const dotenv = require("dotenv");
dotenv.config();
const mysqlPassword = process.env.MYSQL_PASSWORD;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host: "127.0.0.1",
            port: 3306,
            user: "root",
            password: mysqlPassword,
            database: "si_test",
        },
    },
};
