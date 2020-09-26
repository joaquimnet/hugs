require('tiny-env')();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');

console.log(`${require('../package.json').name} v${require('../package.json').version}`);
console.log(`Running on Node ${process.version}`);

const { PORT } = require('./config');

const app = express();

app.use(morgan('common'));
app.use(helmet());

const { hugRoutes } = require('./routes');

app.use('/api/hugs', express.json(), hugRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.redirect('/'));

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
