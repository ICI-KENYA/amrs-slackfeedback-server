const Hapi = require('hapi');
var Good = require('good');

const slackconfig = require('./config/slackconfig');
const slackfeedback = require('./interfaces/get-user-feedback');

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 5000,
    routes: {
        json: {
            space: 4
        }
    }
});

//register routing  plugin
server.register(
    {
         register: require('./route/app-route'),
         options: {}

    },
    (err) => {

    if (err) {
        throw err;
        console.log('failed to load routing plugin', err)
    }
    }
);

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});