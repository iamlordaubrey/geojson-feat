import express from 'express';
import geoFeaturesService from '../services/geofeatures.service';

class GeoFeaturesController {
  async getFeaturesByBbox(req: express.Request, res: express.Response) {
    const geoJSONFeatures = await geoFeaturesService.getByBbox(req.body);
    
    if (geoJSONFeatures instanceof Error) res.status(400).send(geoJSONFeatures)
    else res.status(200).send(geoJSONFeatures);
  }
}

export default new GeoFeaturesController();
