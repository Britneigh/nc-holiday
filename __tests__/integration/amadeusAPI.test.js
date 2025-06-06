import dotenv from "dotenv";
dotenv.config();

import {
  getAccessToken,
  getFlightSearchWithDestination,
  getHotelList,
  getHotelSearch,
  getToursAndActivities,
} from "../../api";

jest.setTimeout(30000);

describe("Amadeus Flight Offers API", () => {
  test("successfully fetches flight offers when given correct parameters", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        return getFlightSearchWithDestination(
          token,
          "PAR",
          "LON",
          "2025-07-01",
          1
        );
      })
      .then((flightOffers) => {
        expect(flightOffers).toHaveProperty("data");
        expect(Array.isArray(flightOffers.data)).toBe(true);
        expect(flightOffers.data.length).toBeGreaterThan(0);
      })
      .catch((error) => {
        console.error(
          "ERROR - Error fetching flight offers:",
          error.response?.data || error.message
        );
        throw error;
      });
  });
  test("Returns 400 when given incorrect parameter(s)", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        return getFlightSearchWithDestination(
          token,
          "XXX",
          "XXX",
          "2025-07-01",
          1
        );
      })
      .catch((error) => {
        console.log("API Error:", error.data.message);
        expect(error.status).toBe(400);
      });
  });
});

///-----

describe("Amadeus Hotels List", () => {
  test("successfully fetches list of hotels when given city code", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        return getHotelList(token, "MIA");
      })
      .then((hotelList) => {
        expect(hotelList).toHaveProperty("data");
        expect(Array.isArray(hotelList.data)).toBe(true);
        expect(hotelList.data.length).toBeGreaterThan(0);
      })
      .catch((error) => {
        console.error(
          "ERROR - Error fetching hotel list:",
          error.response?.data || error.message
        );
        throw error;
      });
  });
  test("Returns 400 when given incorrect parameter(s)", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        return getHotelList(token, "XXX");
      })
      .catch((error) => {
        console.log("API Error:", error.data.message);
        expect(error.status).toBe(400);
      });
  });
});

///-------

describe("Amadeus Hotels Search", () => {
  test("successfully fetches list of available hotels when passed array of hotel codes", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        return getHotelList(token, "MIA");
      })
      .then((hotelList) => {
        return getAccessToken(clientId, clientSecret).then((token) => {
          return getHotelSearch(token, hotelList);
        });
      })
      .then((hotelSearch) => {
        console.log(hotelSearch.data, "<==== hotel search response");
        hotelOffers = hotelSearch.data;
        hotelOffers.forEach((hotelOffer) => {
          console.info(`Hotel: ${hotelOffer.hotel.name}`);

          hotelOffer.offers.forEach((offer, index) => {
            console.info(`  Offer ${index + 1}:`);
            console.info(
              `    Price: ${offer.price.total} ${offer.price.currency}`
            );
          });
        });
        expect(hotelSearch).toHaveProperty("data");
        expect(Array.isArray(hotelSearch.data)).toBe(true);
        expect(hotelSearch.data.length).toBeGreaterThan(0);
      })
      .catch((error) => {
        console.error(
          "ERROR - Error fetching hotel list:",
          error.response?.data || error.message
        );
        throw error;
      });
  });

  test("Returns 400 when given incorrect parameter(s)", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        const ret = getHotelSearch(token, ["fuckoff"]);
        return ret;
      })
      .then((ret) => {
        console.log(ret, "<===return");
      })

      .catch((error) => {
        console.log(error, "<=== error being returned");
        console.log("API Error:", error.data.message);
        expect(error.status).toBe(400);
      });
  });
});

///--------------------------

describe("Amadeus Activities and Tours List", () => {
  test("successfully fetches list of activites and tour given longitude and latitude", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        return getToursAndActivities(token, -80.23881, 25.73856);
      })
      .then((toursAndActivities) => {
        expect(toursAndActivities).toHaveProperty("data");
        expect(Array.isArray(toursAndActivities.data)).toBe(true);
        expect(toursAndActivities.data.length).toBeGreaterThan(0);
      })
      .catch((error) => {
        console.error(
          "ERROR - Error fetching tours and activities:",
          error.response?.data || error.message
        );
        throw error;
      });
  });
  test("Returns 400 when given incorrect parameter(s)", () => {
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

    expect(clientId).toBeTruthy();
    expect(clientSecret).toBeTruthy();

    return getAccessToken(clientId, clientSecret)
      .then((token) => {
        return getToursAndActivities(token, 32, 25.73856); /// coconut grove hotel miami
      })
      .catch((error) => {
        console.log("API Error:", error.data.message);
        expect(error.status).toBe(400);
      });
  });
});
