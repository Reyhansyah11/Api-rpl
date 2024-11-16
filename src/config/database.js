//config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('new', 'root', 'reyyy', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: '+07:00', // Waktu Jakarta (UTC+7)
});

export default sequelize;
