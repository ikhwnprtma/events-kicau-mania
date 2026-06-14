import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// Parse connection string ke object
function parseConnectionString(connectionString) {
  let withoutProtocol = connectionString.replace(/^mysql:\/\//, '');
  let [auth, rest] = withoutProtocol.includes('@') 
    ? withoutProtocol.split('@') 
    : [':', withoutProtocol];
  let [user, password] = auth.includes(':') ? auth.split(':') : [auth, ''];
  let [hostPort, database] = rest.split('/');
  let [host, port] = hostPort.includes(':') ? hostPort.split(':') : [hostPort, '3306'];
  
  return {
    host: host,
    user: user,
    password: password || ' ',
    database: database || ' ',
    port: parseInt(port)
  };
}

const connectionString = process.env.DATABASE_URL;
const dbConfig = parseConnectionString(connectionString);
const adapter = new PrismaMariaDb(dbConfig);

export const prismaClient = new PrismaClient({
  adapter: adapter,
  log: ['error', 'warn']
});

// Handle koneksi saat aplikasi ditutup
process.on('beforeExit', async () => {
  await prismaClient.$disconnect();
});

