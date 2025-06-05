import dotenv from "dotenv";
dotenv.config();

import { getAccessToken, getFlightSearchWithDestination } from "../../api";

jest.setTimeout(30000);

describe("Amadeus Flight Offers API", () => {
  test("successfully fetches flight offers when given correct parameters", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        console.log("SUCCESS - Access token retrieved");
        console.log("Access Token:", token);

        return getFlightSearchWithDestination(
          token,
          "PAR",
          "LON",
          "2025-07-01",
          1
        );
      })
      .then((flightOffers) => {
        expect(flightOffers).toHaveProperty("data");
        expect(Array.isArray(flightOffers.data)).toBe(true);
        expect(flightOffers.data.length).toBeGreaterThan(0);
      })
      .catch((error) => {
        console.error(
          "ERROR - Error fetching flight offers:",
          error.response?.data || error.message
        );
        throw error;
      });
  });
  test("Returns 400 when given incorrect parameter(s)", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        console.log("SUCCESS - Access token retrieved");
        console.log("Access Token:", token);

        return getFlightSearchWithDestination(
          token,
          "XXX",
          "XXX",
          "2025-07-01",
          1
        );
      })
      .catch((error) => {
        console.error("API Error:", error.data.message);
        expect(error.status).toBe(400);
      });
  });
});
