import { db, auth } from "../../firebaseConfig";
import { getTripById } from "../trip/getTripById";

beforeEach(() => {
  const projectId = "emulator-id";
 const firestoreEmulatorHost = "localhost:8082"; // or your actual Firestore emulator port

  return fetch(`http://${firestoreEmulatorHost}/emulator/v1/projects/${projectId}/databases/(default)/documents`, {
    method: "DELETE",
  });
});

describe("GET", () => {
  describe("Get trip by Id", () => {
    test("Returns trip with correct Id", () => {
      const tripId = "test-trip-id";
      return getTripById(tripId).then(trip => {
        expect(trip.id).toBe(tripId);
      });
    });
  });
});
