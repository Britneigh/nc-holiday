import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch";

global.fetch = fetch;

import {
  getAccessToken,
  getFlightSearchWithDestination,
  getHotelList,
  getHotelSearch,
  getToursAndActivities,
} from "../../api";

jest.setTimeout(100000);

describe("Amadeus API Tests", () => {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

  beforeAll(() => {
    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();
  });

  describe("Flight Inspirations API", () => {
    test("fetches flight offers with valid parameters", async () => {
      const token = await getAccessToken(clientId, clientSecret);
      const flightOffers = await getFlightSearchWithDestination(
        token,
        "PAR",
        "LON",
        "2025-07-01",
        1
      );

      expect(flightOffers).toHaveProperty("data");
      expect(Array.isArray(flightOffers.data)).toBe(true);
      expect(flightOffers.data.length).toBeGreaterThan(0);
    });

    test("returns 400 for invalid flight parameters", async () => {
      expect.assertions(2);
      const token = await getAccessToken(clientId, clientSecret);

      try {
        await getFlightSearchWithDestination(
          token,
          "XXX",
          "XXX",
          "2025-07-01",
          1
        );
        throw new Error(
          "Expected error not thrown for invalid flight parameters"
        );
      } catch (error) {
        expect(error.response?.status).toBe(400);
        expect(error.message).toBeTruthy();
      }
    });
  });

  describe("Hotels List API", () => {
    test("fetches hotel list with valid city code", async () => {
      const token = await getAccessToken(clientId, clientSecret);
      const hotelList = await getHotelList(token, "NYC");

      expect(hotelList).toHaveProperty("data");
      expect(Array.isArray(hotelList.data)).toBe(true);
      expect(hotelList.data.length).toBeGreaterThan(0);
    });

    test("returns 404 for invalid city code", async () => {
      expect.assertions(2);
      const token = await getAccessToken(clientId, clientSecret);

      try {
        await getHotelList(token, "XXX");
        throw new Error("Expected error not thrown for invalid city code");
      } catch (error) {
        expect(error.response?.status).toBe(404);
        expect(error.message).toBeTruthy();
      }
    });
  });

  describe("Hotels Search API", () => {
    test("fetches hotel offers from hotel list", async () => {
      const token = await getAccessToken(clientId, clientSecret);
      const hotelList = await getHotelList(token, "NYC");

      if (hotelList.data.length === 0) {
        return console.warn(
          "No hotels found for city, skipping hotel search test."
        );
      }

      const hotelOffers = await getHotelSearch(token, hotelList.data);

      expect(hotelOffers).toHaveProperty("data");
      expect(Array.isArray(hotelOffers.data)).toBe(true);
      expect(hotelOffers.data.length).toBeGreaterThan(0);
    });

    test("returns 404 for invalid hotel codes", async () => {
      expect.assertions(2);
      const token = await getAccessToken(clientId, clientSecret);

      try {
        await getHotelSearch(token, ["invalidHotelCode"]);
        throw new Error("Expected error not thrown for invalid hotel codes");
      } catch (error) {
        expect(error.response?.status).toBe(404);
        expect(error.message).toBeTruthy();
      }
    });
  });

  describe("Tours and Activities API", () => {
    test("fetches tours and activities with valid lat/lon", async () => {
      const token = await getAccessToken(clientId, clientSecret);
      const activities = await getToursAndActivities(
        token,
        25.73856,
        -80.26248,
        30
      );

      expect(activities).toHaveProperty("data");
      expect(Array.isArray(activities.data)).toBe(true);
      expect(activities.data.length).toBeGreaterThan(0);
    });

    test("returns 400 for invalid latitude", async () => {
      expect.assertions(2);
      const token = await getAccessToken(clientId, clientSecret);

      try {
        await getToursAndActivities(token, 131, -80.26248, 30); // Invalid latitude > 90
        throw new Error("Expected error not thrown for invalid latitude");
      } catch (error) {
        expect(error.response?.status).toBe(400);
        expect(error.message).toBeTruthy();
      }
    });
  });
});
