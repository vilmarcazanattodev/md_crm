import {Pool} from 'pg';
import {config} from 'dotenv';

config();

const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: Number(process.env.PG_PORT),
});


pool.on('connect', () => {
  console.log('📦 Conectado ao PostgreSQL');
});


pool.on('error', err => {
  console.log("❌ Erro de conexão com o PostgreSQL:", err);
});


pool.connect();

export default pool;
