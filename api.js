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

export const getFlightSearchWithDestination = (
  token,
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults,
  returnDate
) => {
  const params = {
    originLocationCode,
    destinationLocationCode,
    departureDate,
    adults,
  };

  if (returnDate) {
    params.returnDate = returnDate;
  }

  return axios
    .get("https://test.api.amadeus.com/v2/shopping/flight-offers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    })
    .then((response) => {
      // console.log(response.data)
      return response.data;
    })
    .catch((error) => {
      const normalizedError = {
        status: error.response?.status || 500,
        data: error.response?.data || {
          message: error.message || "Unknown error",
        },
      };
      throw normalizedError;
    });
};

//--------------------

export const getHotelList = (
  token,
  cityCode,
  radius = 5,
  radiusUnit = "KM",
  chainCodes = [],
  amenities = [],
  ratings = [],
  hotelSource = "ALL"
) => {
  const params = {
    cityCode,
    radius,
    radiusUnit,
    hotelSource,
  };

  if (chainCodes.length > 0) params.chainCodes = chainCodes.join(",");
  if (amenities.length > 0) params.amenities = amenities.join(",");
  if (ratings.length > 0) params.ratings = ratings.join(",");

  return axios
    .get(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params,
      }
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      const normalizedError = {
        status: error.response?.status || 500,
        data: error.response?.data || {
          message: error.message || "Unknown error",
        },
      };
      throw normalizedError;
    });
};

//--------------------------

export const getHotelSearch = (
  token,
  hotelList, // object passed in
  adults = 1,
  checkInDate,
  checkOutDate,
  countryOfResidence,
  roomQuantity = 1,
  priceRange,
  currency,
  paymentPolicy = "NONE",
  boardType,
  includeClosed = false,
  bestRatesOnly = true,
  lang
) => {
  // Extract and validate hotelIds
  const hotelIds = Array.isArray(hotelList?.data)
    ? hotelList.data.map((item) => item.hotelId).filter(Boolean)
    : [];

  // Auto-default checkInDate if missing
  if (!checkInDate) {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    checkInDate = today;
  }

  // Auto-default checkOutDate if missing
  if (!checkOutDate) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    checkOutDate = tomorrow.toISOString().split("T")[0];
  }


  // Build params object
  const params = {
    adults,
    checkInDate,
    checkOutDate,
    countryOfResidence,
    roomQuantity,
    priceRange,
    currency,
    paymentPolicy,
    boardType,
    includeClosed,
    bestRatesOnly,
    lang,
  };

  params.hotelIds = hotelIds.join(",");

  // Clean out undefined params
  Object.keys(params).forEach(
    (key) => params[key] === undefined && delete params[key]
  );

  return axios
    .get("https://test.api.amadeus.com/v3/shopping/hotel-offers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params,
    })
    .then((response) => {
      return response.data;
    })
   .catch((error) => {
      const normalizedError = {
        status: error.response?.status || 500,
        data: error.response?.data || {
          message: error.message || "Unknown error",
        },
      };
      throw normalizedError;
    });
};
