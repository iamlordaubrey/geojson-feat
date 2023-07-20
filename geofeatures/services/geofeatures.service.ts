import osmtogeojson from "osmtogeojson";
import { DOMParser } from "xmldom";

interface BoundingBox {
  minLongitude: string;
  minLatitude: string;
  maxLongitude: string; 
  maxLatitude: string;
}

const open_street_map_api = process.env.OPEN_STREET_MAP_API || "https://www.openstreetmap.org/api/0.6/map" ;
// const open_street_map_api = process.env.OPEN_STREET_MAP_API;
if (!open_street_map_api) throw new Error(`Environment variable "open_street_map_api" is undefined.`);

class GeoFeaturesService {
  async getByBbox(bbox: BoundingBox) {
    const bBoxString: string = `${bbox.minLongitude},${bbox.minLatitude},${bbox.maxLongitude},${bbox.maxLatitude}`
    const url = `${open_street_map_api}?bbox=${bBoxString}`

    return fetch(url, {method: 'GET'})
    .then(async (response) => {
      if (response.ok) return response.text();
      else throw await response.text();
    })
    .then(response => {
      return osmtogeojson(this.parseXml(response))
    })
    .catch(error => new Error (error))
  }

  parseXml(xmlString: string): Document {
    return new DOMParser().parseFromString(xmlString, 'text/xml')
  }
}


export default new GeoFeaturesService();
