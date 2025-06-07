/// <reference types="jest" />

import { db, auth } from "../../firebaseConfig";
import { getTripById } from "../trip/getTripById";

beforeEach(async () => {
  const projectId = "emulator-id";
  const firestoreEmulatorHost = "localhost:8080";
  await fetch(`http://${firestoreEmulatorHost}/emulator/v1/projects/${projectId}/databases/(default)/documents`, {
    method: "DELETE",
  });
});

describe("GET", () => {
  describe("Get trip by Id", () => {
    test("Returns trip with correct Id", async () => {
      const tripId = "test-trip-id";
      const trip = await getTripById(tripId);
      expect(trip.id).toBe(tripId);
    });
  });
});
