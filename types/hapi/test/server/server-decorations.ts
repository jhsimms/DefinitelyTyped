// https://github.com/hapijs/hapi/blob/master/API.md#-serverdecoratetype-property-method-options
import { ResponseToolkit, Server } from "hapi";

declare module 'hapi' {
    interface HandlerDecorations {
        test?: {
            test: number;
        };
    }
}

const server = new Server({
    port: 8000,
});

server.start();
server.decorate('toolkit', 'success', function() {
    return this.response({ status: 'ok' });
});
server.decorate('handler', 'test', (route, options) => (req, h) => 123);
server.route({
    method: 'GET',
    path: '/',
    handler: {
        test: {
            test: 123,
        },
        asd: 1,
    }
});

console.log(server.decorations.toolkit);
