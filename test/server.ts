import { setupServer } from "msw/node";
import { rest } from "msw";

export const server = setupServer(
  // Describe network behavior with request handlers.
  // Tip: move the handlers into their own module and
  // import it across your browser and Node.js setups!

  // Mock the request to openstreetmap
  rest.get("https://www.example.com", (req, res, ctx) => {
      return res(
          ctx.xml(`<?xml version="1.0" encoding="UTF-8"?>`),
      )
  }),
)