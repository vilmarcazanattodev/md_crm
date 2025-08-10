import type {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import Fastify from 'fastify';
import pool from "./postgres.ts";

const fastify: FastifyInstance = Fastify({logger: true});

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return {hello: 'world'};
});

fastify.get('/allTables', async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const result = await pool.query("SELECT table_name FROM information_schema.tables ORDER BY table_name;");
    return result.rows.map(row => row.table_name);
  } catch (err) {
    reply.status(500).send({ error: 'Erro ao buscar tabelas', details: err });
  }
})

const start = async () => {
  try {
    await fastify.listen({port: 3000, host: '0.0.0.0'});
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(String(err));
    process.exit(1);
  }
};

start();