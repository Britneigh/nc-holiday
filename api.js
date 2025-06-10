import axios from "axios";

const AMADEUS_AUTH_URL = "https://test.api.amadeus.com/v1/security/oauth2/token";
const AMADEUS_FLIGHT_SEARCH_URL = "https://test.api.amadeus.com/v2/shopping/flight-offers";
const AMADEUS_HOTELS_LIST_URL = "https://test.api.amadeus.com/v2/shopping/hotel-offers";
const AMADEUS_TOURS_ACTIVITIES_URL = "https://test.api.amadeus.com/v1/shopping/activities";

export async function getAccessToken(clientId, clientSecret) {
  try {
    const response = await axios.post(AMADEUS_AUTH_URL, new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }).toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    return response.data.access_token;
  } catch (error) {
    throw formatAxiosError(error);
  }
}

export async function getFlightSearchWithDestination(token, origin, destination, departureDate, adults) {
  try {
    const response = await axios.get(AMADEUS_FLIGHT_SEARCH_URL, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        originLocationCode: origin,
        destinationLocationCode: destination,
        departureDate,
        adults,
        max: 10,
      },
    });

    return response.data;
  } catch (error) {
    throw formatAxiosError(error);
  }
}

export async function getHotelList(token, cityCode) {
  try {
    const response = await axios.get(AMADEUS_HOTELS_LIST_URL, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        cityCode,
        radius: 50,
        radiusUnit: "KM",
        hotelSource: "ALL",
        bestRateOnly: true,
        view: "FULL",
        sort: "PRICE",
      },
    });

    return response.data;
  } catch (error) {
    throw formatAxiosError(error);
  }
}

export async function getHotelSearch(token, hotelOffers) {
  try {
    // Assuming hotelOffers is an array of hotel codes or objects with hotelCodes
    const hotelIds = Array.isArray(hotelOffers)
      ? hotelOffers.map(hotel => typeof hotel === "string" ? hotel : hotel.hotel && hotel.hotel.hotelId).filter(Boolean)
      : [];

    if (!hotelIds.length) throw new Error("Invalid hotel offers parameter");

    const response = await axios.post(
      `${AMADEUS_HOTELS_LIST_URL}/list`,
      { hotelIds },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    throw formatAxiosError(error);
  }
}

export async function getToursAndActivities(token, latitude, longitude, radius = 30) {
  try {
    const response = await axios.get(AMADEUS_TOURS_ACTIVITIES_URL, {
      headers: { Authorization: `Bearer ${token}` },
      params: {
        latitude,
        longitude,
        radius,
        radiusUnit: "KM",
        lang: "en-US",
      },
    });

    return response.data;
  } catch (error) {
    throw formatAxiosError(error);
  }
}

function formatAxiosError(error) {
  if (error.response) {
    const { status, data } = error.response;
    const message = data?.message || data?.error_description || JSON.stringify(data) || error.message;
    const err = new Error(message);
    err.status = status;
    err.data = data;
    throw err;
  } else {
    throw error;
  }
}
