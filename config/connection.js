const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: '127.0.0.1',
            dialect: 'mysql',
            port: 3306
        }
    );
}

module.exports = sequelize
//  {
//     HOST: 'us-cdbr-east-06.cleardb.net',
//     USER: 'be973830a8c5b2',
//     PASSWORD: 'bf3e011b',
//     DB: 'heroku_bc4d0fb90112654'
// };