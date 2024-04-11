export default () => ({
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_DBNAME,
  },
});

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  dbName: string;
}
