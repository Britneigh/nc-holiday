import { flightSearchWithDestination, flightsApi } from "../api";
import axios from "axios";

jest.mock("axios", () => {
  // Mock axios.create to return an object with a .get mock function
  const mAxiosInstance = { get: jest.fn() };
  return {
    post: jest.fn(),
    create: jest.fn(() => mAxiosInstance),
  };
});

jest.mock("expo-constants", () => ({
  expoConfig: {
    extra: {
      AMADEUS_CLIENT_ID: "test_client_id",
      AMADEUS_CLIENT_SECRET: "test_client_secret",
    },
  },
}));

describe("flightSearchWithDestination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("resolves with flight data when API calls succeed", async () => {
    axios.post.mockResolvedValueOnce({ data: { access_token: "mock-token" } });

    // flightsApi is the axios instance returned by axios.create()
    flightsApi.get.mockResolvedValueOnce({
      data: { flights: ["flight1", "flight2"] },
    });

    const params = {
      originLocationCode: "BOS",
      destinationLocationCode: "PAR",
      departureDate: "2025-06-10",
      adults: 1,
    };

    const data = await flightSearchWithDestination(params);

    expect(axios.post).toHaveBeenCalledWith(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      expect.any(URLSearchParams),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    expect(flightsApi.get).toHaveBeenCalledWith(
      "/shopping/flight-offers",
      expect.objectContaining({
        headers: { Authorization: "Bearer mock-token" },
        params,
      })
    );

    expect(data).toEqual({ flights: ["flight1", "flight2"] });
  });

  test("rejects if token fetch fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("token error"));

    await expect(flightSearchWithDestination({})).rejects.toThrow("token error");
  });

  test("rejects if flight fetch fails", async () => {
    axios.post.mockResolvedValueOnce({ data: { access_token: "mock-token" } });

    flightsApi.get.mockRejectedValueOnce(new Error("flights error"));

    await expect(flightSearchWithDestination({})).rejects.toThrow("flights error");
  });
});
