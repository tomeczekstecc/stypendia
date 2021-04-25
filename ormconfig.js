const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build';
// const rootDir = 'src';

module.exports = {
  type: process.env.DB_DIALECT,
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,

  database: process.env.MYSQL_DATABASE,
  // synchronize: process.env.NODE_ENV === 'development',
  synchronize: true,
  // logging: process.env.NODE_ENV === 'development',
  logging: false,
  // entities: [
  //   rootDir +
  //     (process.env.NODE_ENV === 'development' ? '/entity/**/*.{ts,js}' : '/entity/**/*.js'),
  // ],

  // migrations: [
  //   rootDir +
  //     (process.env.NODE_ENV === 'development' ? '/migration/**/*.{ts,js}' : '/migration/**/*.js'),
  // ],
  entities: [rootDir + '/entity/**/*.js'],
  migrations: [rootDir + '/migration/**/*.js'],
  //subscribers: rootDir + ['/subscriber/**/*.{.ts,.js}'],

  cli: {
    entitiesDir: rootDir + '/entity',
    migrationsDir: rootDir + '/migration',
    //  subscribersDir: rootDir + '/subscriber',
  },
};
