import express from 'express';
import GeoFeaturesService from '../services/geofeatures.service';

class GeoFeaturesController {
  async getFeaturesByBbox(req: express.Request, res: express.Response) {
    const geoJSONFeatures = await GeoFeaturesService.getByBbox(req.body);

    if (geoJSONFeatures instanceof Error) res.status(400).send(geoJSONFeatures)
    else res.status(200).send(geoJSONFeatures);

    // res.status(200).send(geoJSONFeatures);
  }
}

export default new GeoFeaturesController();
