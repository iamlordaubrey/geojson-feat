import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';

export class GeoFeaturesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'GeoFeaturesRoutes');
    }

    configureRoutes(): express.Application {
      return this.app;
    }
}
