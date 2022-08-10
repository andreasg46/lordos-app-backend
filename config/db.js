const { Sequelize } = require('sequelize');

// Postgres
const db = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres"
});

// // Sync DB
// async function init() {
//     await db.sync();
// }
//
// init();


module.exports = db;