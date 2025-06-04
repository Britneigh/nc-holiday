import axios from 'axios'
import Constants from 'expo-constants'

// Get environment variables from app.config.js
const { AMADEUS_CLIENT_ID, AMADEUS_CLIENT_SECRET } = Constants.expoConfig.extra

// Get access token from Amadeus
const getAccessToken = () => {
  const authUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token'

  const data = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: AMADEUS_CLIENT_ID,
    client_secret: AMADEUS_CLIENT_SECRET
  })

  return axios.post(authUrl, data, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => response.data.access_token)
}


// Flights
const flightsApi = axios.create({
    baseURL: "https://test.api.amadeus.com/v2"

    /* Required parameters: 
        originLocationCode: city/airport IATA code from which the traveler will depart, e.g. BOS for Boston
        destinationLocationCode: city/airport IATA code to which the traveler is going, e.g. PAR for Paris
        departureDate: the date on which the traveler will depart from the origin to go to the destination. Dates are specified in the ISO 8601 YYYY-MM-DD format, e.g. 2017-12-25
        adults: the number of adult travelers (age 12 or older on date of departure), the total number of seated travelers (adult and children) can not exceed 9.
    */
})

export const flightSearchWithDestination = ({
  originLocationCode,
  destinationLocationCode,
  departureDate,
  adults
}) => {
    return getAccessToken()
    .then((token)=>{
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
        })
    })
    .then((response)=>{
        return response.data
    })
}

// Surprise me
export const flightSearchWithoutDestination = ({
  originLocationCode,
}) => {
    return getAccessToken()
    .then((token)=>{
        return flightsApi.get(`/shopping/flight-offers`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                originLocationCode,
            }   
        })
    })
    .then((response)=>{
        return response.data
    })
}

// Hotels
const hotelsApi = axios.create({
    baseURL: "https://test.api.amadeus.com/v3"

    /* Required parameters: 
        hotelIds: Amadeus property codes on 8 chars. Mandatory parameter for a search by predefined list of hotels. e.g. List [ "MCLONGHM" ]
    */
})

export const hotelSearch = ({hotelIds}) => {
    return getAccessToken()
    .then((token)=>{
        return hotelsApi.get(`/shopping/hotel-offers`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                hotelIds
            }
        })
    })
    .then((response)=>{
        return response.data
    })
}

// Activities
const activitiesApi = axios.create({
    baseURL: "https://test.api.amadeus.com/v1"

    /* Required parameters: 
        latitude: Latitude (decimal coordinates) e.g. 41.397158
        longitude: Longitude (decimal coordinates) e.g. 2.160873
    */
})

export const activitySearch = ({latitude, longitude}) => {
    return getAccessToken()
    .then((token)=>{
        return activitiesApi.get(`/shopping/activities`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            params: {
                latitude,
                longitude
            }
        })
    })
    .then((response)=>{
        return response.data
    })
}