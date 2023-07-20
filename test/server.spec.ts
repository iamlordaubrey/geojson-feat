import "jest";
import app from "../app";
import {agent as request} from "supertest";
import nock from "nock";
import {rest} from "msw";
import { setupServer } from "msw/node";
import GeoFeaturesService from '../geofeatures/services/geofeatures.service';

const server = setupServer(
    // Describe network behavior with request handlers.
    // Tip: move the handlers into their own module and
    // import it across your browser and Node.js setups!
    rest.get('https://www.openstreetmap.org/api/0.6/map', (req, res, ctx) => {
      return res(
        ctx.xml(lineStringResponse01),
      )
    }),
)

// Enable request interception.
beforeAll(() => server.listen({ onUnhandledRequest: ({ method, url }) => {
    // allow requests to /api endpoints
    if (!url.pathname.startsWith("/api")) {
        throw new Error(`Unhandled ${method} request to ${url}`);
    }
} }));

// Reset handlers so that each test could alter them
// without affecting other, unrelated tests.
afterEach(() => server.resetHandlers())

// Don't forget to clean up afterwards.
afterAll(() => {
    server.close()
    app.close()
})

it('blablabla', async () => {
    const res  = await request(app)
    .post('/api/geo-features')
    .send(boundingBox)

    expect(res.status).toEqual(200)
})

it('blablabla', async () => {
    const res  = await request(app)
    .post('/api/geo-features')
    .send(boundingBox)

    expect(res.status).toEqual(200)
})

it('displays the list of recent posts', async () => {
    const someResp = await GeoFeaturesService.getByBbox(boundingBox)
    console.log(someResp)
    // expect(someResp.status).toEqual(200);

    // expect(.status).toEqual(200);
    // render(<Dashboard />)
  
    // // 🕗 Wait for the posts request to be finished.
    // await waitFor(() => {
    //   expect(
    //     screen.getByLabelText('Fetching latest posts...'),
    //   ).not.toBeInTheDocument()
    // })
  
    // // ✅ Assert that the correct posts have loaded.
    // expect(
    //   screen.getByRole('link', { name: /Avoid Nesting When You're Testing/ }),
    // ).toBeVisible()
  
    // expect(
    //   screen.getByRole('link', { name: /How I Built A Modern Website In 2021/ }),
    // ).toBeVisible()
})


// const MOCK_PRICES = [50, 47, 53, 50, 49, 51, 52];
// const MOCK_AVERAGE = 50.29;

// // const MOCK_RESPONSE = {
// //     "type": "FeatureCollection",
// //     "features": [{"type": "Feature", "id": "relation/123", "properties": []}]
// // };
const lineStringResponse = `<?xml version="1.0" encoding="UTF-8"?>
<osm><way id='1'>
<nd ref='1' />
<nd ref='2' lat='1' lon='1' />
<nd ref='3' lat='2' lon='2' />
<nd ref='4' />
</way></osm>
`;

const lineStringResponse01 = `<?xml version="1.0" encoding="UTF-8"?>
<osm version="0.6" generator="CGImap 0.8.8 (2992908 spike-07.openstreetmap.org)" copyright="OpenStreetMap and contributors" attribution="http://www.openstreetmap.org/copyright" license="http://opendatacommons.org/licenses/odbl/1-0/">
 <bounds minlat="50.8531400" minlon="4.3705100" maxlat="50.8572700" maxlon="4.3804900"/>
 <node id="8194551" visible="true" version="7" changeset="99538584" timestamp="2021-02-18T16:58:34Z" user="bxl-forever" uid="2644288" lat="50.8542151" lon="4.3689483"/>
 <relation id="15926997" visible="true" version="1" changeset="136826141" timestamp="2023-06-01T11:04:52Z" user="bxl-forever" uid="2644288">
 <member type="way" ref="1052812915" role="target"/>
 <member type="node" ref="2362333024" role="address"/>
 <tag k="type" v="provides_feature"/>
</relation>
</osm>
 `;

// const MOCK_RESPONSE = "<xml><a></a></xml>"

// global.fetch = jest.fn(() => Promise.resolve({
//     ok: true,
//     status: 200,
//     json: () => Promise.resolve({ rates: { CAD: 1.42 }})
// })) as jest.Mock;

let boundingBox = {
  "minLongitude": "3.3774",
  "minLatitude": "6.5619",
  "maxLongitude": "3.4173",    
  "maxLatitude": "6.5879"
};

// jest.useRealTimers();

// describe('Gold prices', () => {
//     let averagePrice: object|null;

//     describe('When the average price is called for 7 days', () => {
//         let resp: any | null;
//         beforeEach(async () => {
//             // averagePrice = await GeoFeaturesService.getByBbox(boundingBox);
//             // averagePrice = await getPricesLastDays(7);

//             resp = await request(app)
//                 .post('/geo-features')
//                 // .set('Content-Type', 'application/json')
//                 // .set('Accept', 'application/json')
//                 .send({
//                     minLongitude: "3.3774",
//                     minLatitude: "6.5619",
//                     maxLongitude: "3.4173",    
//                     maxLatitude: "6.5879"
//                 })

//                 // .then((res) => {
//                 //     expect(res.status).toEqual(200);
//                 //     expect(res.body).toBeDefined;
//                 //     // expect(res.body).to.be.an("object");
//                 //     expect(res.body.type).toEqual("FeatureCollection");
//                 // });
//         });

//         afterEach(async () => {
//             await app.close()
//             // Close the server instance after each test
//             app.close()
//           })

//         //   nock('https://www.openstreetmap.org/api/0.6/map')
//         //   .defaultReplyHeaders({
//         //     'Content-Type': 'text/xml',
//         //   })
//         //   .get('/geo-features')
//         //   .reply(200, MOCK_RESPONSE)
//         rest.get('https://www.openstreetmap.org/api/0.6/map', (req, res, ctx) => {
//             return res(
//                 ctx.status(200),
//                 ctx.text(lineStringResponse)
//             )
//         } )

//         it('Then the correct average should be returned', async () => {
//             // expect(fetch).toHaveBeenCalledTimes(1)
            
            
//             // console.log('resp: ', resp)
//             const someResp = await GeoFeaturesService.getByBbox(boundingBox)
//             console.log(someResp)
//             // expect(someResp).toEqual(MOCK_RESPONSE)
//             // expect(scope.status).toEqual(200);
//             // expect(resp.body).toBeDefined;
//             // // expect(resp.body).to.be.an("object");
//             // expect(resp.body.type).toEqual("FeatureCollection");

            

//             // expect(averagePrice).toEqual({ average: MOCK_AVERAGE });
//         });
//     });
// });

// // describe('Gold prices', () => {
// //     let averagePrice: object|null;

// //     describe('When the average price is called for 7 days', () => {
// //         beforeEach(async () => {
// //             // averagePrice = await GeoFeaturesService.getByBbox(boundingBox);
// //             averagePrice = await getPricesLastDays(7);
// //         });

// //         it('Then the correct average should be returned', () => {
// //             expect(averagePrice).toEqual({ average: MOCK_AVERAGE });
// //         });
// //     });
// // });


// // import request from 'supertest';
// // import createHttpServer from './server';
// // import fetch from 'node-fetch';

// // const { Response } = jest.requireActual('node-fetch');
// // const server = createHttpServer();

// // jest.mock('node-fetch', () => jest.fn());

// // afterAll(done => {
// //   server.close(done);
// // });

// // describe('router', () => {
// //   test('GET: should return data', async () => {
// //     const expectedResponse = { test: 'TEST' };
// //     (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce(new Response(JSON.stringify(expectedResponse)));

// //     const response = await request(server).get('/test');
// //     expect(response.status).toEqual(200);
// //     expect(response.body).toEqual(expectedResponse);
// //   });

// //   test('GET: should throw error', async () => {
// //     const mockedFetchError = new Error('some error');
// //     (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(mockedFetchError);
// //     const response = await request(server).get('/test');
// //     expect(response.status).toEqual(500);
// //   });
// // });

// async function getPricesLastDays(days: number) {
//     try {
//         const result = await fetch(`https://api.gold/price?days=${days}`);
//         const prices = await result.json();

//         const sum = prices.reduce((total: number, currentValue: number) => total + currentValue, 0);
//         const average = sum / prices.length;

//         return { average: +average.toFixed(2) };
//     } catch (error) {
//         // handle error
//         return null;
//     }
// }