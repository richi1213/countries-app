const jsonServer = require('json-server');
const fs = require('fs');
const path = require('path');

const db = JSON.parse(fs.readFileSync(path.join('database.json')));
const server = jsonServer.create();
const router = jsonServer.router(db);
const middlewares = jsonServer.defaults();

server.use(
  jsonServer.rewriter({
    '/api/*': '/$1',
  }),
);
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running');
});

module.exports = server;
