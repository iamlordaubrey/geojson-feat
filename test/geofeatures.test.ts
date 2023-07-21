import { server } from "./server";
import {agent as request} from "supertest";
import app from "../app";
import { goodResponse, validBoundingBox, emptyResponse, invalidBoundingBox, zeroesBoundingBox } from "./mocks";
import { rest } from "msw";

// Enable request interception.
beforeAll(() => server.listen({ 
    onUnhandledRequest: ({ method, url }) => {
        // MSW throws warnings on request without handlers. 
        // We mute warnings on requests to /api endpoints
        if (!url.pathname.startsWith("/api")) {
            throw new Error(`Unhandled ${method} request to ${url}`);
        }
    } 
}));

afterEach(() => server.resetHandlers())

afterAll(() => {
    server.close()
    
    // Close supertest server instance after each test
    app.close()
})

it("displays the geo-json features of the given location; given valid input fields, ", async () => {
    server.use(
        rest.get("https://www.openstreetmap.org/api/0.6/map", (req, res, ctx) => {
            return res(
                ctx.xml(goodResponse),
            )
        }),
    )

    const response  = await request(app)
    .post("/api/geo-features")
    .send(validBoundingBox)

    expect(response.status).toEqual(200);
    expect(response.body).toBeDefined;
    expect(response.body.type).toEqual("FeatureCollection");
});

it("returns an empty list of features; if non was found", async () => {
    server.use(
        rest.get("https://www.openstreetmap.org/api/0.6/map", (req, res, ctx) => {
            return res(
                ctx.xml(emptyResponse),
            )
        }),
    )

    const response  = await request(app)
    .post("/api/geo-features")
    .send(zeroesBoundingBox)

    expect(response.status).toEqual(200)
    expect(response.body).toBeDefined;
    expect(response.body.features).toBeNull
    expect(response.body.features).toMatchObject([])
})

it("returns Bad request (400); given invalid input fields", async () => {
    server.use(
        rest.get("https://www.openstreetmap.org/api/0.6/map", (req, res, ctx) => {
            console.log('do we RRRRREAALLLLY?')
            return res(
                ctx.xml("express-validation handles this response"),
            )
        }),
    )

    const response  = await request(app)
    .post("/api/geo-features")
    .send(invalidBoundingBox)

    expect(response.status).toEqual(400)
    expect(response.body.errors).toBeDefined;
})
