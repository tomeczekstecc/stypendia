// const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'build';
const rootDir = 'src';

module.exports = {
  type: 'mysql',
  host: 'db_stypendia',
  port: 3306,
  username: 'tomek',
  password: 'zFh8e^x8Pqxc6b4Q',
  database: 'stypendia_dev',
  // synchronize: process.env.NODE_ENV === 'development',
  synchronize: true,
  // logging: process.env.NODE_ENV === 'development',
  logging: false,
  entities: [rootDir + '/entity/**/*.{ts,js}'],
  migrations: [rootDir + '/migration/**/*.{ts,js}'],
  //   subscribers: rootDir + ['/subscriber/**/*.{.ts,.js}'],

  cli: {
    entitiesDir: rootDir + '/entity',
    migrationsDir: rootDir + '/migration',
    //  subscribersDir: rootDir + '/subscriber',
  },
};
