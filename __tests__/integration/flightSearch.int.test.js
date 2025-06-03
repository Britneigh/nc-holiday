import dotenv from "dotenv";
dotenv.config();

import { getAccessToken, getFlightDestinations } from "../../api";

describe("Amadeus Flight Inspiration API", () => {
  test("fetches flight destinations from Paris under 200 EUR", async () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    const token = await getAccessToken(clientId, clientSecret);
    console.log("✅ Access token retrieved");

    let data;
    try {
      data = await getFlightDestinations(token, "MAD", 3000);
      console.log("✅ Flight destinations:", data);
    } catch (error) {
      console.error("❌ Error fetching destinations:", error.response?.data || error.message);
      throw error;
    }

    expect(data).toHaveProperty("data");
    expect(Array.isArray(data.data)).toBe(true);
    expect(data.data.length).toBeGreaterThan(0);
  });
});
