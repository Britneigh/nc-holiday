jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        AMADEUS_CLIENT_ID: "test_client_id",
        AMADEUS_CLIENT_SECRET: "test_client_secret",
      },
    },
  },
}));

jest.mock("axios", () => ({
  post: jest.fn(),
  get: jest.fn(),
}));

import { getFlightSearchWithDestination } from "../api";
import axios from "axios";

describe("flightSearchWithDestination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("resolves with flight data when API calls succeed", async () => {
    axios.post.mockResolvedValueOnce({
      data: { access_token: "mock-token" },
    });
    axios.get.mockResolvedValueOnce({
      data: { flights: ["flight1", "flight2"] },
    });

    const params = {
      originLocationCode: "BOS",
      destinationLocationCode: "PAR",
      departureDate: "2025-06-10",
      adults: 1,
    };

    const data = await getFlightSearchWithDestination(params);

    expect(axios.post).toHaveBeenCalledWith(
      "https://test.api.amadeus.com/v1/security/oauth2/token",
      "grant_type=client_credentials&client_id=test_client_id&client_secret=test_client_secret",
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    expect(axios.get).toHaveBeenCalledWith(
      "https://test.api.amadeus.com/v2/shopping/flight-offers",
      {
        headers: { Authorization: "Bearer mock-token" },
        params: {
          adults: 1,
          departureDate: "2025-06-10",
          destinationLocationCode: "PAR",
          originLocationCode: "BOS",
        },
      }
    );

    expect(data).toEqual({ flights: ["flight1", "flight2"] });
  });

  test("rejects if token fetch fails", async () => {
    axios.post.mockRejectedValueOnce(new Error("token error"));

    await expect(getFlightSearchWithDestination({})).rejects.toThrow(
      "token error"
    );
  });

  test("rejects if flight fetch fails", async () => {
    axios.post.mockResolvedValueOnce({ data: { access_token: "mock-token" } });

    axios.get.mockRejectedValueOnce(new Error("flights error"));

    await expect(getFlightSearchWithDestination({})).rejects.toThrow(
      "flights error"
    );
  });
});
