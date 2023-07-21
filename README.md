# GeoJSON Featured API

A restful API that exposes a route to get GeoJSON features of a location, 
given a geolocation box ([bounding box](https://wiki.openstreetmap.org/wiki/Bounding_Box)).


### Quick Start
Copy the content of `.env.example` to a file called `.env` and install dependencies
```
$ cp .env.example .env
$ npm i
```


Once all the packages have been installed, start the server. In another terminal, 
make a request using CURL (alternatively, Postman or any other client works).
```
npm run dev
```
```
curl -X POST http://localhost:3000/api/geo-features -H 'Content-Type: application/json' -d '{"minLongitude": "3.3774", "minLatitude": "6.5619", "maxLongitude": "3.4173", "maxLatitude": "6.5879"}'
```

### Endpoint
`/api/geo-features`

### Payload sample
```
{
    "minLongitude": "3.3774",
    "minLatitude": "6.5619",
    "maxLongitude": "3.4173",    
    "maxLatitude": "6.5879"
}
```

Golden ~~boot~~ package: [msw](https://www.npmjs.com/package/msw)