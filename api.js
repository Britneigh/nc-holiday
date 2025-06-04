import axios from "axios";

let AMADEUS_CLIENT_ID;
let AMADEUS_CLIENT_SECRET;

if (typeof window === "undefined") {
  // Node.js (e.g., Jest, backend)
  import("dotenv").then((dotenv) => dotenv.config());

  AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
  AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

  if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
    console.warn(
      "WARNING Missing Amadeus credentials in environment variables"
    );
  }
} else {
  // Expo (frontend)
  const Constants = require("expo-constants").default;
  AMADEUS_CLIENT_ID = Constants.expoConfig.extra.AMADEUS_CLIENT_ID;
  AMADEUS_CLIENT_SECRET = Constants.expoConfig.extra.AMADEUS_CLIENT_SECRET;

  if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
    console.warn("WARNING Missing Amadeus credentials in app config");
  }
}

export const getAccessToken = (
  clientId = AMADEUS_CLIENT_ID,
  clientSecret = AMADEUS_CLIENT_SECRET
) => {
  const authUrl = "https://test.api.amadeus.com/v1/security/oauth2/token";

  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  return axios
    .post(authUrl, data.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((response) => response.data.access_token);
};

export const getFlightDestinations = (token, origin, maxPrice) => {
  return axios
    .get("https://test.api.amadeus.com/v1/shopping/flight-destinations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        origin,
        maxPrice,
      },
    })
    .then((response) => response.data);
};

export const getFlightOffers = (
  token,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults = 1
) => {
  return axios
    .get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        originLocationCode,
        destinationLocationCode,
        departureDate,
        adults,
      },
    })
    .then((response) => response.data);
};
