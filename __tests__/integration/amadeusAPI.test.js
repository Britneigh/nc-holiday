import dotenv from "dotenv";
dotenv.config();

import {
  getAccessToken,
  getFlightSearchWithDestination,
  // getFlightDestinations,
  getHotelList,
  getHotelSearch,
  getToursAndActivities,
} from "../../api";

jest.setTimeout(100000);

const getToken = async () => {
  const clientId = process.env.AMADEUS_CLIENT_ID;
  const clientSecret = process.env.AMADEUS_CLIENT_SECRET;
  expect(clientId).toBeTruthy();
  expect(clientSecret).toBeTruthy();
  return await getAccessToken(clientId, clientSecret);
};

// Flight Destinations

describe("Amadeus Flight Inspirations API", () => {
  test("fetches cheapest destinations successfully", async () => {
    const token = await getToken();
    const flightDestinations = await getFlightSearchWithDestination(token, "PAR", "LON", "2025-07-01", 1);

    expect(flightDestinations).toHaveProperty("data");
    expect(Array.isArray(flightDestinations.data)).toBe(true);
    expect(flightDestinations.data.length).toBeGreaterThan(0);
  });

  test("returns 400 for invalid parameters", async () => {
    const token = await getToken();
    try {
      await getFlightSearchWithDestination(token, "XXX", "XXX", "2025-07-01", 1);
    } catch (error) {
      console.log("API Error:", error?.response?.data?.message || error?.message);
      expect(error.status).toBe(400);
    }
  });
});

// Flight Offers

describe("Amadeus Flight Offers API", () => {
  test("fetches flight offers successfully", async () => {
    const token = await getToken();
    const flightOffers = await getFlightSearchWithDestination(token, "PAR", "LON", "2025-07-01", 1);

    expect(flightOffers).toHaveProperty("data");
    expect(Array.isArray(flightOffers.data)).toBe(true);
    expect(flightOffers.data.length).toBeGreaterThan(0);
  });
});

// Hotel List

describe("Amadeus Hotel List", () => {
  test("fetches list of hotels by city code", async () => {
    const token = await getToken();
    const hotelList = await getHotelList(token, "MIA");

    expect(hotelList).toHaveProperty("data");
    expect(Array.isArray(hotelList.data)).toBe(true);
    expect(hotelList.data.length).toBeGreaterThan(0);
  });

  test("returns 400 for invalid city code", async () => {
    const token = await getToken();
    try {
      await getHotelList(token, "XXX");
    } catch (error) {
      console.log("API Error:", error?.response?.data?.message || error?.message);
      expect(error.status).toBe(400);
    }
  });
});

// Hotel Search

describe("Amadeus Hotel Search", () => {
  test("fetches available hotel offers", async () => {
    const token = await getToken();
    const hotelList = await getHotelList(token, "MIA");
    const hotelSearch = await getHotelSearch(token, hotelList);

    expect(hotelSearch).toHaveProperty("data");
    expect(Array.isArray(hotelSearch.data)).toBe(true);
    expect(hotelSearch.data.length).toBeGreaterThan(0);
  });

  test("returns 400 for invalid hotel codes", async () => {
    const token = await getToken();
    try {
      await getHotelSearch(token, ["INVALID_CODE"]);
    } catch (error) {
      console.log("API Error:", error?.response?.data?.message || error?.message);
      expect(error.status).toBe(400);
    }
  });
});

// Tours & Activities

describe("Amadeus Tours & Activities", () => {
  test("fetches tours and activities by coordinates", async () => {
    const token = await getToken();
    const activities = await getToursAndActivities(token, 25.73856, -80.26248, 30);

    expect(activities).toHaveProperty("data");
    expect(Array.isArray(activities.data)).toBe(true);
    expect(activities.data.length).toBeGreaterThan(0);
  });

  test("returns 400 for invalid coordinates", async () => {
    const token = await getToken();
    try {
      await getToursAndActivities(token, 131, -80.26248, 30);
    } catch (error) {
      console.log("API Error:", error?.response?.data?.message || error?.message);
      expect(error.status).toBe(400);
    }
  });
});

//// --------------------

// // To retrieve:
// // const savedResults = JSON.parse(fs.readFileSync('holidayData.json', 'utf-8'));

// describe.only("Amadeus Get Hotels and experiences initial departure and maxPrice", () => {
//   test("Given a flight dep/dest/date/passengers, returns nested array with results", () => {
//     const clientId = process.env.AMADEUS_CLIENT_ID;
//     const clientSecret = process.env.AMADEUS_CLIENT_SECRET;

//     expect(clientId).toBeTruthy();
//     expect(clientSecret).toBeTruthy();

//     console.log("Making Amadeus API call with key:", clientId);

//     return getAccessToken(clientId, clientSecret)
//       .then((token) => {
//         return getHolidayDataTest(token, "PAR", "LON", "2025-07-01", 1); // Correct usage
//       })
//       .then((results) => {
//         // Save results to file
//         fs.writeFileSync("holidayData.json", JSON.stringify(results, null, 2));

//         // Also log results
//         console.log(results, "<=== array returned to test");

//         // Perform test assertion
//         expect(Array.isArray(results)).toBe(true);

//         // Optionally check array length or structure:
//         // expect(results.length).toBeGreaterThan(0);
//         // expect(results[0]).toHaveProperty('flight');
//         // expect(results[0]).toHaveProperty('hotels');
//       })
//       .catch((error) => {
//         console.error(
//           "ERROR - Error fetching data in test:",
//           error && (error.response?.data || error.message || error.toString()),
//           error?.stack
//         );
//         throw error; // rethrow so Jest sees the test failed
//       });
//   });
// });
