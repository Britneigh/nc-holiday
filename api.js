import axios from "axios";

let AMADEUS_CLIENT_ID;
let AMADEUS_CLIENT_SECRET;

if (typeof window === "undefined") {
  import("dotenv").then((dotenv) => dotenv.config());

  AMADEUS_CLIENT_ID = process.env.AMADEUS_CLIENT_ID;
  AMADEUS_CLIENT_SECRET = process.env.AMADEUS_CLIENT_SECRET;

  if (!AMADEUS_CLIENT_ID || !AMADEUS_CLIENT_SECRET) {
    console.warn(
      "WARNING Missing Amadeus credentials in environment variables"
    );
  }
} else {
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

///-------------------------------

export const getFlightDestinations = (
  token,
  origin,
  departureDate,
  maxPrice
) => {
  return axios
    .get("https://test.api.amadeus.com/v1/shopping/flight-destinations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        origin,
        departureDate,
        maxPrice,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "ERROR in getFlightDestinations:",
        error?.response?.status,
        error?.response?.data
      );

      return { data: { data: [] } };
    });
};

//----------------------

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
  ratings,
  radius,
  amenities,
  // radiusUnit = "KM",
  // chainCodes = [],
  // hotelSource = "ALL"
) => {
  const params = {
    cityCode,
    ratings,
    radius,
    // radiusUnit,
    // hotelSource,
  };
  // params.ratings = ratings.join(",");
  // if (amenities.length > 0) params.amenities = amenities.join(",");
  if (amenities.length === 0) delete params.amenities

  // if (chainCodes.length > 0) params.chainCodes = chainCodes.join(",");
  // if (rating.length > 0) params.rating = rating.join(",");

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
  checkInDate,
  checkOutDate,
  adults,
  hotelList,
  // countryOfResidence,
  // roomQuantity = 1,
  // priceRange,
  // currency,
  // paymentPolicy = "NONE",
  // boardType,
  // includeClosed = false,
  // bestRatesOnly = true,
  // lang
) => {
  const hotelIds = Array.isArray(hotelList?.data)
    ? hotelList.data.map((item) => item.hotelId).filter(Boolean)
    : [];

    if (!checkInDate) {
      const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      checkInDate = today;
    }

    if (!checkOutDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      checkOutDate = tomorrow.toISOString().split("T")[0];
    }

  const params = {
    checkInDate,
    checkOutDate,
    adults,
    // countryOfResidence,
    // roomQuantity,
    // priceRange,
    // currency,
    // paymentPolicy,
    // boardType,
    // includeClosed,
    // bestRatesOnly,
    // lang,
  };

  params.hotelIds = hotelIds.join(",");

  
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

///---------------------

export const getToursAndActivities = (
  token,
  latitude,
  longitude,
  radius = 10
) => {
  const params = {
    latitude,
    longitude,
    radius,
  };

  return axios
    .get("https://test.api.amadeus.com/v1/shopping/activities", {
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

//-----------------------------------

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const rateLimitedRequest = (fn, args = [], retries = 5, attempt = 1) => {
  return fn(...args).catch((error) => {
    if (error?.status === 429 && retries > 0) {
      const baseDelay = 2000 * 2 ** (attempt - 1);
      const jitter = Math.floor(Math.random() * 1000) - 500;
      const backoff = baseDelay + jitter;

      console.warn(`Rate limited. Retry attempt ${attempt} after ${backoff}ms`);
      return delay(backoff).then(() =>
        rateLimitedRequest(fn, args, retries - 1, attempt + 1)
      );
    }
    throw error;
  });
};

// export const getHolidayData = (
//   token,
//   origin,
//   destination,
//   date,
//   passengers = 1
// ) => {
//   const results = [];

//   return rateLimitedRequest(getFlightSearchWithDestination, [
//     token,
//     origin,
//     destination,
//     date,
//     passengers,
//   ])
//     .then((flightsResponse) => {
//       const flights = (flightsResponse?.data || []).slice(0, 5);

//       return flights.reduce((flightChain, flight) => {
//         return flightChain.then(() => {
//           const flightResult = {
//             flight,
//             hotels: [],
//           };

//           return rateLimitedRequest(getHotelList, [token, destination])
//             .then((hotelsResponse) => {
//               const hotels = (hotelsResponse?.data || []).slice(0, 5);

//               return hotels.reduce((hotelChain, hotel) => {
//                 return hotelChain
//                   .then(() => delay(500))
//                   .then(() =>
//                     rateLimitedRequest(getToursAndActivities, [
//                       token,
//                       hotel.latitude,
//                       hotel.longitude,
//                     ])
//                       .then((toursResponse) => {
//                         const tours = (toursResponse?.data || []).slice(0, 5);
//                         flightResult.hotels.push({
//                           hotel,
//                           tours,
//                         });
//                       })
//                       .catch((error) => {
//                         console.error(
//                           `Error fetching tours for hotel ${hotel.name}:`,
//                           error
//                         );
//                         flightResult.hotels.push({
//                           hotel,
//                           tours: [],
//                         });
//                       })
//                   );
//               }, Promise.resolve());
//             })
//             .catch((error) => {
//               console.error(
//                 `Error fetching hotels for flight to ${destination}:`,
//                 error
//               );
//             })
//             .then(() => {
//               results.push(flightResult);
//             });
//         });
//       }, Promise.resolve());
//     })
//     .catch((error) => {
//       console.error(
//         `Error fetching flights from ${origin} to ${destination}:`,
//         error
//       );
//     })
//     .then(() => {
//       return results;
//     });
// };

//--------------------------
export const getHolidayDataTest = (
  token,
  origin,
  destination,
  date,
  passengers = 1
) => {
  const results = [];

  console.log(
    "Making Amadeus API call with key:",
    process.env.AMADEUS_CLIENT_ID
  );

  return rateLimitedRequest(getFlightSearchWithDestination, [
    token,
    origin,
    destination,
    date,
    passengers,
  ])
    .then((flightsResponse) => {
      const flights = (flightsResponse?.data || []).slice(0, 1); // <= 1 flight only

      // Fetch hotels once for the destination
      return rateLimitedRequest(getHotelList, [token, destination]).then(
        (hotelsResponse) => {
          const hotels = (hotelsResponse?.data || []).slice(0, 1); // <= 1 hotel only

          // For each flight, map to flightResult with same hotels data
          return flights.reduce((flightChain, flight) => {
            return flightChain.then(() => {
              const flightResult = {
                flight,
                text: flightText(flight),
                hotels: [],
              };

              // For each hotel, get tours and activities with delay
              return hotels
                .reduce((hotelChain, hotel) => {
                  return hotelChain
                    .then(() => delay(1000)) // safer delay between tour calls
                    .then(() =>
                      rateLimitedRequest(getToursAndActivities, [
                        token,
                        hotel.latitude,
                        hotel.longitude,
                      ])
                        .then((toursResponse) => {
                          const tours = (toursResponse?.data || [])
                            .slice(0, 1) // <= 1 tour only
                            .map((tour) => ({
                              tour,
                              text: tourText(tour),
                            }));

                          flightResult.hotels.push({
                            text: hotelText(hotel),
                            hotel,
                            tours,
                          });
                        })
                        .catch((error) => {
                          console.error(
                            `Error fetching tours for hotel ${hotel.name}:`,
                            error
                          );
                          flightResult.hotels.push({
                            hotel,
                            tours: [],
                          });
                        })
                    );
                }, Promise.resolve())
                .then(() => {
                  results.push(flightResult);
                });
            });
          }, Promise.resolve());
        }
      );
    })
    .catch((error) => {
      console.error(
        `Error fetching flights or hotels from ${origin} to ${destination}:`,
        error
      );
    })
    .then(() => {
      return results;
    });
};


//-------

export const extractFlightInfo = (flightOffer) => {
  const itinerary = flightOffer.itineraries[0];

  const firstSegment = itinerary.segments[0];
  const lastSegment = itinerary.segments[itinerary.segments.length - 1];

  const departureAirport = firstSegment.departure.iataCode;
  const departureTime = firstSegment.departure.at;

  const arrivalAirport = lastSegment.arrival.iataCode;
  const arrivalTime = lastSegment.arrival.at;

  const airlineCode = firstSegment.carrierCode;

  const totalPrice = flightOffer.price.total;
  const currency = flightOffer.price.currency;

  return {
    departureAirport,
    departureTime,
    arrivalAirport,
    arrivalTime,
    airlineCode,
    totalPrice,
    currency,
  };
};

//-----------

const flightText = (flight) => {
  const {
    departureAirport,
    departureTime,
    arrivalAirport,
    arrivalTime,
    airlineCode,
    totalPrice,
    currency,
  } = extractFlightInfo(flight);

  return `Flight from ${departureAirport} at ${departureTime} to ${arrivalAirport} at ${arrivalTime} | Airline: ${airlineCode} | Price: ${totalPrice} ${currency}`;
};

//------

function extractHotelInfo(hotelOffer) {
  const hotel = hotelOffer.hotel;

  const name = hotel.name;
  const starRating = hotel.rating;

  const offer = hotelOffer.offers && hotelOffer.offers[0];

  const roomType = offer?.room?.type || "N/A";
  const totalPrice = offer?.price?.total || "N/A";
  const currency = offer?.price?.currency || "";
  const checkInDate = offer?.checkInDate || "N/A";
  const checkOutDate = offer?.checkOutDate || "N/A";

  let thumbnail = "No image available";
  if (hotel.media && hotel.media.length > 0) {
    thumbnail = hotel.media[0].uri || hotel.media[0].url || thumbnail;
  }

  return {
    name,
    starRating,
    roomType,
    totalPrice,
    currency,
    checkInDate,
    checkOutDate,
    thumbnail,
  };
}

////-----

function hotelText(hotelOffer) {
  const {
    name,
    starRating,
    roomType,
    totalPrice,
    currency,
    checkInDate,
    checkOutDate,
    thumbnail,
  } = extractHotelInfo(hotelOffer);

  return `
Hotel: ${name} (${starRating}★)
Room Type: ${roomType}
Price: ${totalPrice} ${currency}
Check-in: ${checkInDate}
Check-out: ${checkOutDate}
Thumbnail: ${thumbnail}
`;
}

///----

function extractTourInfo(tour) {
  return {
    name: tour.name || "N/A",
    description: tour.shortDescription || tour.description || "No description",
    price: tour.price?.amount || "N/A",
    currency: tour.price?.currency || "",
    category: tour.category?.name || "N/A",
    rating: tour.rating || "N/A",
    images:
      tour.media && tour.media.length > 0
        ? tour.media.map((m) => m.uri || m.url)
        : [],
  };
}

function tourText(tour) {
  const { name, description, price, currency, category, rating, images } =
    extractTourInfo(tour);

  return `
Tour: ${name}
Category: ${category}
Price: ${price} ${currency}
Rating: ${rating}
Description: ${description}
Images: ${images.length > 0 ? images.join(", ") : "No images available"}
`;
}
