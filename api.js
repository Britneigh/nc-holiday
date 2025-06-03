import axios from 'axios';
import Constants from 'expo-constants';

// Get environment variables from app.config.js
const { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } = Constants.expoConfig.extra;

// Get access token from Amadeus
const getAccessToken = () => {
  const authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';

  const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: AMADEUS_CLIENT_ID,
    client_secret: AMADEUS_CLIENT_SECRET
  });

  return axios.post(authUrl, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => response.data.access_token);
};

// Flights
export const flightsApi = axios.create({
  baseURL: "https://test.api.amadeus.com/v2"
});

export const flightSearchWithDestination = ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults
}) => {
  return getAccessToken()
    .then((token) => {
      return flightsApi.get(`/shopping/flight-offers`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          originLocationCode,
          destinationLocationCode,
          departureDate,
          adults
        }
      });
    })
    .then((response) => response.data);
};

export const flightSearchWithoutDestination = ({
  originLocationCode
}) => {
  return getAccessToken()
    .then((token) => {
      return flightsApi.get(`/shopping/flight-offers`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          originLocationCode
        }
      });
    })
    .then((response) => response.data);
};

// Hotels
export const hotelsApi = axios.create({
  baseURL: "https://test.api.amadeus.com/v3"
});

export const hotelSearch = ({ hotelIds }) => {
  return getAccessToken()
    .then((token) => {
      return hotelsApi.get(`/shopping/hotel-offers`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          hotelIds
        }
      });
    })
    .then((response) => response.data);
};

// Activities
export const activitiesApi = axios.create({
  baseURL: "https://test.api.amadeus.com/v1"
});

export const activitySearch = ({ latitude, longitude }) => {
  return getAccessToken()
    .then((token) => {
      return activitiesApi.get(`/shopping/activities`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          latitude,
          longitude
        }
      });
    })
    .then((response) => response.data);
};
