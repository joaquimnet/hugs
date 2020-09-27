require('tiny-env')();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
const Sequelize = require('sequelize');

// info logs
console.log(`${require('../package.json').name} v${require('../package.json').version}`);
console.log(`Running on Node ${process.version}`);

const { PORT, PRODUCTION, DB_HOST, DB_PASS, DB_USER, DB_DATABASE } = require('./config');
const { loadServices } = require('./service-loader');

// db
const sequelize = new Sequelize({
  dialect: 'mysql',
  username: DB_USER,
  password: DB_PASS,
  host: DB_HOST,
  database: DB_DATABASE,
});

sequelize.authenticate().then(() => {});
global.sequelize = sequelize;

// express
const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(morgan('common'));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

app.use(express.static(path.join(__dirname, 'public')));

loadServices(path.join(__dirname, 'services'), app);

app.get('/', (req, res) => res.render('index'));

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  if (!PRODUCTION) console.log(`http://localhost:${PORT}/`);
});

const terminate = () => {
  console.log('Received signal to exit...');
  server.close();
  global.sequelize.close();
  setTimeout(() => process.exit(0), 3000).unref();
};
process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);
