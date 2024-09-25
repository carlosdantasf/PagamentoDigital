const env = process.env.NODE_ENV || 'development';
const envFile = `.env${env === 'development' ? '' : `.${env}`}`;
require('dotenv').config({ path: envFile });
const express = require('express');
const app = express();

const { DB_USER, DB_PASSWORD, DB_NAME, DB_HOST, DIALECT } = process.env;

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DIALECT
});

const ticketRoutes = require('./routes/ticketsRoutes');
const cors = require('cors');

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch((err: any) => console.error('Error connecting to database:', err));

app.use(express.json());

app.use(cors());

app.use('/tickets', ticketRoutes);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});