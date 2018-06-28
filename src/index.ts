import * as debug from 'debug';
import * as http from 'http';
import Server from './server';
import * as serverHandlers from './serverHandlers';

debug('ts-express:server');

const port: number | string | boolean = serverHandlers.normalizePort(process.env.PORT || 3000);
const expressServer: Server = new Server();

expressServer.app.set('port', port);
console.log(`Server listening on port ${port}`);

const server: http.Server = http.createServer(expressServer.app);

server.listen(port);
server.on('error', error => serverHandlers.onError(error, port));
server.on('listening', serverHandlers.onListening.bind(server));

export { expressServer }
