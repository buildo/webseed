import fs from 'fs';
import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import React from 'react';
import Router from 'react-router-transition-context';
import DocumentTitle from 'react-document-title';
import { remote as _remote } from 'revenge';
import allRoutes from '../app/routes';
import config from '../../config';
import API from '../app/HTTPAPI';
import DB from '../app/DB';
import queries from '../app/queries';
import App from '../app/App';
import debug from 'debug';
import locale from 'locale';

const log = debug('server');

if (!config.iso) {
  log('running with config.iso = false. I\'m useless... :(');
  process.exit(-1);
}

const template =
  fs.readFileSync(path.resolve(__dirname, '../../build/index.html'), 'utf8').toString();

const app = express();

const gzTypes = [{
  match: /\.css\.gz$/,
  type: 'text/css'
}, {
  match: /\.js\.gz$/,
  type: 'application/javascript'
}];

const supportedLocales =
  fs.readdirSync(path.resolve(__dirname, '../app/locales/'))
    .map(localePath => localePath.split('.')[0]);

app.use(express.static(path.resolve(__dirname, '../../build'), {
  index: false,
  setHeaders: (res, path) => {
    if (/\.gz$/.test(path)) {
      res.setHeader('Content-Encoding', 'gzip');
      const gzType = gzTypes.filter(({ match }) => match.test(path))[0];
      if (gzType) {
        res.setHeader('Content-Type', gzType.type);
      }
      log(`serving gzipped ${path}, type: ${gzType ? gzType.type : 'unhandled'}`);
    }
  }
}));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(locale(supportedLocales));

if (config.remote) {
  const remote = _remote(queries(API));

  app.post('/__remote', (req, res) => {
    log('handling remote post, recipe:', req.body);
    remote(req.body).then(data => {
      res.json(data);
    });
  });
}

app.use((req, res, next) => {
  if (req.method.toLowerCase() !== 'get') {
    res.end(400);
  }

  const { url } = req;

  if (url === '/favicon.ico' || url.indexOf('/themes') !== -1) {
    return res.end();
  }

  if (url.indexOf('/socket.io') !== -1) {
    log('close or refresh the development page! the socket.io polling is killing me...');
    process.exit(-1);
  }

  next();
});

app.use((req, res, next) => {
  const { method, url, cookies } = req;

  log('handling %s %s', method, url);

  const token = JSON.parse(cookies[App.AUTH_KEY] || 'null');

  const initialData = DB.getDefaultData(token);
  const db = new DB(initialData);

  const app = new App({ API, db });

  const router = Router.create({
    transitionContext: app,
    routes: allRoutes,
    location: new Router.StaticLocation(url),
    onAbort(abortReason) {
      if (abortReason.constructor.name === 'Redirect') {
        const { to, params, query } = abortReason;
        log('redirect to %s', to);
        const url = router.makePath(to, params, query);
        res.redirect(url);
      } else {
        next(abortReason);
      }
    }
  });

  function render(Handler, locale) {
    const intlData = require(`../app/locales/${locale}`);

    return data => {
      const body = React.renderToString(<Handler app={app} router={router} { ...intlData } />);
      const title = DocumentTitle.rewind(); // Note. Call rewind() AFTER React.renderToString
      const html = template
        .replace('__TITLE__', title || config.title)
        .replace('__CONTENT__', body)
        .replace('__STATE__', JSON.stringify(db))
        .replace('__LOCALE__', `'${locale}'`)
        .replace('__DATA__', JSON.stringify(data));
      res.send(html);
    };
  }

  router.run((Handler, state) => {
    const { routes, params, query } = state;
    app.fetch(routes, app.getState({ params, query }))
      .then(render(Handler, req.locale))
      .catch(next);
  });

});

const HOSTNAME = config.hostname || 'localhost';
const PORT = config.port || 8080;
app.listen(PORT, HOSTNAME, () => log(`server ready at ${HOSTNAME}:${PORT}`));
