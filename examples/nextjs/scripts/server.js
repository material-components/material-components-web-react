const express = require('express');
const next = require('next');
const router = require('./router');

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    for (const path in router) {
      server.get(path, (req, res) => {
        app.render(
          req,
          res,
          router[path],
          req.params
        ).catch(console.error);
      });
    }

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if(err) {
        throw err;
      }
      console.log(`> Ready on Server Port: ${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
