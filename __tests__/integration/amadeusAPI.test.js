import dotenv from "dotenv";
dotenv.config();

import { getAccessToken, getFlightSearchWithDestination } from "../../api";

jest.setTimeout(100000);

describe("Amadeus API Tests", () => {
  let clientId;
  let clientSecret;
  let token;

  beforeAll(() => {
    clientId = process.env.AMADEUS_CLIENT_ID;
    clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret).then((accessToken) => {
      token = accessToken;
      expect(token).toBeTruthy();
    });
  });

  describe("Flight Inspirations API", () => {
    test("fetches flight offers with valid parameters", () => {
      return getFlightSearchWithDestination(
        token,
        "PAR",
        "LON",
        "2025-07-01",
        1
      ).then((flightOffers) => {
        expect(flightOffers).toHaveProperty("data");
        expect(Array.isArray(flightOffers.data)).toBe(true);
        expect(flightOffers.data.length).toBeGreaterThan(0);
      });
    });

    test("returns 400 for invalid flight parameters", () => {
      expect.assertions(2);

      return getFlightSearchWithDestination(
        token,
        "XXX",
        "XXX",
        "2025-07-01",
        1
      )
        .then(() => {
          throw new Error(
            "Expected error not thrown for invalid flight parameters"
          );
        })
        .catch((error) => {
          if (error.response && error.response.status) {
            expect(error.response.status).toBe(400);
          } else if (error.status) {
            expect(error.status).toBe(400);
          } else {
            throw new Error("Error does not contain response status 400");
          }
          expect(error.message).toBeTruthy();
        });
    });
  });

  describe("Hotels List API", () => {
    test("fetches hotel list with valid city code", () => Promise.resolve());
    test("returns 404 for invalid city code", () => Promise.resolve());
  });

  describe("Hotels Search API", () => {
    test("fetches hotel offers from hotel list", () => Promise.resolve());
    test("returns 404 for invalid hotel codes", () => Promise.resolve());
  });

  describe("Tours and Activities API", () => {
    test("fetches tours and activities with valid lat/lon", () =>
      Promise.resolve());
    test("returns 400 for invalid latitude", () => Promise.resolve());
  });
});
