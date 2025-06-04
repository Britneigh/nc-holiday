import dotenv from "dotenv";
dotenv.config();

import { getAccessToken, getFlightOffers } from "../../api";

describe("Amadeus Flight Offers API", () => {
  test("fetches flight offers from Paris to London", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then(token => {
        console.log("SUCCESS - Access token retrieved");
        console.log("Access Token:", token);

        return getFlightOffers(token, "PAR", "LON", "2025-07-01", 1);
      })
      .then(flightOffers => {
        console.log("SUCCESS - Flight offers:", flightOffers.data);
        expect(flightOffers).toHaveProperty("data");
        expect(Array.isArray(flightOffers.data)).toBe(true);
        expect(flightOffers.data.length).toBeGreaterThan(0);
      })
      .catch(error => {
        console.error("ERROR - Error fetching flight offers:", error.response?.data || error.message);
        throw error;
      });
  });
});
