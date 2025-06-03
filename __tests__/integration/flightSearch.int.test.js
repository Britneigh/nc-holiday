import dotenv from "dotenv";
dotenv.config();

import { getAccessToken } from "../../api";
import axios from "axios";

const getFlightOffers = (token, origin, destination, departureDate, adults = 1) => {
  return axios.get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
    headers: { Authorization: `Bearer ${token}` },
    params: {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      adults,
    },
  }).then(res => res.data);
};

describe("Amadeus Flight Offers API", () => {
  test("fetches flight offers from Paris to London", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then(token => {
        console.log("✅ Access token retrieved");
        console.log("Access Token:", token);

        return getFlightOffers(token, "PAR", "LON", "2025-07-01", 1);
      })
      .then(data => {
        console.log("✅ Flight offers:", data);
        expect(data).toHaveProperty("data");
        expect(Array.isArray(data.data)).toBe(true);
        expect(data.data.length).toBeGreaterThan(0);
      })
      .catch(error => {
        console.error("❌ Error fetching flight offers:", error.response?.data || error.message);
        throw error;
      });
  });
});
