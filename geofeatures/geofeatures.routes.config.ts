import {CommonRoutesConfig} from '../common/common.routes.config';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';
import GeoFeaturesController from './controllers/geofeatures.controller';
import express from 'express';

export class GeoFeaturesRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'GeoFeaturesRoutes');
    }

    configureRoutes(): express.Application {
      this.app
      .route(`/api/geo-features`)
      .post(
        // Validate input using express-validator
        body('minLongitude').isString(),
        body('minLatitude').isString(),
        body('maxLongitude').isString(),
        body('maxLatitude').isString(),
        BodyValidationMiddleware.verifyBodyFieldsErrors,
        GeoFeaturesController.getFeaturesByBbox
      );

      return this.app;
    }
}
