import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import * as cors from 'cors';
import * as cron from 'node-cron';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';


import SyncProducts from './crons/sync-products';
import * as bodyParser from 'body-parser';
import { Database } from './api/database';
import routes from './api/routes';

// import { getProductBySlug, findProducts } from './api/modules/products/products';
// import { bulkAvailability } from 'api/modules/availability/availability';
// import { getLocations } from 'api/modules/locations/locations';
// import { getAllCountries, getCitiesOfCountry } from 'api/modules/country-state-city/country-state-city';
// import { getWarehouses, getWarehouseTypes } from 'api/modules/warehouses/warehouses';
// import { getTransportCosts } from 'api/modules/transport-costs/transport-costs';


import {
  userAuth
} from './api/utils/authentication-middleware';

const compression = require('compression');

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  // Database
  Database.initialize();

  const server = express();
  const distFolder = join(process.cwd(), 'dist/frontend/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  server.use(compression());
  server.use(cors());

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  server.use('/api', routes);

  // Serve static files from /browser
  server.get(
    '*.*',
    // @ts-ignore
    express.static(distFolder, {
      maxAge: '1y',
    })
  );

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  // Crons
  SyncProducts();
  cron.schedule('0 0 * * *', SyncProducts);

  return server;
}

function run(): void {
  const port = process.env.PORT || 3000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
