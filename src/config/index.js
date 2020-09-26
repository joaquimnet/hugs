module.exports = {
  PORT: process.env.PORT ?? 3000,
  DB_USER: process.env.DB_USER ?? 'admin',
  DB_PASS: process.env.DB_PASS ?? null,
  DB_HOST: process.env.DB_HOST ?? 'localhost',
  DB_DATABASE: process.env.DB_DATABASE ?? 'hugs',
};
