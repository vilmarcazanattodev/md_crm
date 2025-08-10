import type {FastifyInstance, FastifyReply, FastifyRequest} from 'fastify';
import Fastify from 'fastify';

const fastify: FastifyInstance = Fastify({ logger: true });

fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: 'world' };
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Servidor rodando em http://localhost:3000');
  } catch (err) {
    fastify.log.error(String(err));
    process.exit(1);
  }
};

start();