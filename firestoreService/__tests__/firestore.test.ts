import { signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { doc, setDoc, Timestamp, serverTimestamp, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebaseConfig';
import {
    addTrip,
    getTripById,
    getTrips,
    deleteTrip,
    getAccomsByTrip,
    addAccom,
    getFlightsByTrip,
    addFlight,
    getActivitiesByTrip,
    addActivity,
    updateFlightDetails, 
    updateTripDetails,
    updateActivityDetails,
    updateAccomDetails,
    type TripData,
    type AccomData,
    type FlightData,
    type ActivityData,
    deleteFlight,
    deleteAccom,
    deleteActivity,
} from '../../firestoreService'; 
import { clearFirestoreEmulatorData, getAccomById, getActivityById, getFlightById } from './testUtils';
import {
    loginTestUser,
    seedTestData,
    cleanupAfterTests,
    DIFFERENT_USER_ID,
    SAMPLE_TRIP_1_TRIP_ID,
    sampleTrip1,
    setupTestUser,
} from './testSetup';

import { type Accom, type Activity } from '../../firestoreService';

 console.log("--------------Note: you need to reset the emulators after every test, or one test will fail---------------------------------")


let testUser: User

beforeEach(async () => {
  await clearFirestoreEmulatorData();
  testUser = await setupTestUser();
  if (!testUser) {
    fail('Test setup failed: user was not initialized.');
  }
  await seedTestData(testUser.uid);
});
afterAll(async () => {
  await cleanupAfterTests();
});


describe('GEt', () => {
  
  describe('getTripById', () => {
    
    test('should return the correct trip data for a valid ID', () => {
      return getTripById(SAMPLE_TRIP_1_TRIP_ID)
      .then((trip) => {
        expect(trip).not.toBeNull();
        if (trip) {
          expect(trip.id).toBe('trip1');
          expect(trip.tripName).toBe(sampleTrip1.tripName);
          expect(trip.location).toBe(sampleTrip1.location);
          expect(trip.userId).toBe(testUser.uid);
        }
      });
    })
    
    test('should return null for a non-existent trip ID', () => {
      return getTripById("THIS_ID_DOES_NOT_EXIST")
      .then((trip) => {
        expect(trip).toBeNull()
      })
    });
    
    test('should return null if an error occurs',() => {
      return getTripById("invalid/id/format")
      .then((trip) => {
        expect(trip).toBeNull();
      })
    }); 
  });
  
  describe('getTrips', () => {
    
    test('should return a ist of all the users trips', () => {
      return getTrips().then((trips) => {
        if (trips) {
          expect(trips).not.toBeNull()
          expect(trips).toHaveLength(2);
          trips.forEach((trip) => {
            expect(trip.userId).toBe(testUser.uid)
          })
          const tripIds = trips.map((trip) => trip.id)
          expect(tripIds).toContain('trip1')
          expect(tripIds).toContain('trip2')
          
        }
        else {
          fail('getTrips() should have returned an array of trips, but it returned null.');
        }
      })
    })
    
    test('should return empty array if user not signed in', () => {
      return signOut(auth)
      .then(() => {
        return getTrips()
        .then((trips) => {
          if (trips) {
            expect(trips).toEqual([])
          }
          else {
            fail('getTrips() should have returned an array of trips, but it returned null.');
          }
        })
      })
    })
    
    test('should return an empty array for an authenticated user with no trips', () => {
      return clearFirestoreEmulatorData()
      .then(() => {
        return setupTestUser('emptyuser@test.com', 'password123')
        .then(() => getTrips()
        .then((trips) => {
          expect(trips).not.toBeNull();
          expect(trips).toEqual([]);
        })
        
      )
    })
  });
  
});

describe('getAccomsByTrip', () => {
  
  test('should return the correct accommodations for a valid trip ID', () => {
    return getAccomsByTrip(SAMPLE_TRIP_1_TRIP_ID)
    .then((accoms) => {
      expect(accoms).not.toBeNull();
      
      if (accoms) {
        expect(accoms).toHaveLength(2);
        
        const accomIds = accoms.map((accom) => accom.id);
        expect(accomIds).toContain('accom1');
        expect(accomIds).toContain('accom2');
        
        accoms.forEach((accom) => {
          expect(accom.tripId).toBe(SAMPLE_TRIP_1_TRIP_ID);
        });
      } 
      else {
        fail('getAccomsByTripId() should have returned an array, but it returned null.');
      }
    });
  });
  
  test('should return null for a non-existent trip ID', () => {
    return getAccomsByTrip("THIS_ID_DOES_NOT_EXIST")
    .then((accoms) => {
      expect(accoms).toEqual([])
    })
  });
  
  test('should return null if an error occurs',() => {
    return getAccomsByTrip("invalid/id/format")
    .then((accoms) => {
      expect(accoms).toEqual([]);
    })
  }); 
  
});

describe('getFlightsByTrip', () => {
  
  test('should return the correct flights for a valid trip ID', () => {
    return getFlightsByTrip(SAMPLE_TRIP_1_TRIP_ID)
    .then((flights) => {
      expect(flights).not.toBeNull();
      
      if (flights) {
        console.log(flights)
        expect(flights).toHaveLength(2);
        
            const flightIds = flights.map((flight) => flight.id);
            expect(flightIds).toContain('flight1');
            expect(flightIds).toContain('flight2');
            
            flights.forEach((flight) => {
              expect(flight.tripId).toBe(SAMPLE_TRIP_1_TRIP_ID);
            });
          } 
          else {
            fail('getflightsByTripId() should have returned an array, but it returned null.');
          }
        });
      });
      
      test('should return null for a non-existent trip ID', () => {
        return getFlightsByTrip("THIS_ID_DOES_NOT_EXIST")
        .then((flights) => {
          expect(flights).toEqual([])
        })
      });
      
      test('should return null if an error occurs',() => {
        return getFlightsByTrip("invalid/id/format")
        .then((flights) => {
          expect(flights).toEqual([]);
        })
      }); 
      
    });
  })
    
    describe('getActivitiesByTrip', () => {
      
      test('should return the correct activities for a valid trip ID', () => {
        return getActivitiesByTrip(SAMPLE_TRIP_1_TRIP_ID)
        .then((activities) => {
          expect(activities).not.toBeNull();
          
          if (activities) {
            expect(activities).toHaveLength(2);
            
            const activityIds = activities.map((activity) => activity.id);
            expect(activityIds).toContain('activity1');
            expect(activityIds).toContain('activity2');
            
            activities.forEach((activity) => {
              expect(activity.tripId).toBe(SAMPLE_TRIP_1_TRIP_ID);
            });
          } 
          else {
            fail('getactivitiesByTripId() should have returned an array, but it returned null.');
          }
        });
      });
      
      test('should return null for a non-existent trip ID', () => {
        return getActivitiesByTrip("THIS_ID_DOES_NOT_EXIST")
        .then((activities) => {
          expect(activities).toEqual([])
        })
      });
      
      test('should return null if an error occurs',() => {
        return getActivitiesByTrip("invalid/id/format")
        .then((activities) => {
          expect(activities).toEqual([]);
        })
      }); 
      
    });
    
    describe('ADD', () => {
    
      describe('addTrip', () => {

        test('should add a new trip, return an ID, and store the correct data', () => {
          const newTripData = {
            tripName: "Africa",
            location: "Sahara Desert",
            cost: 1,
            startDate: Timestamp.fromDate(new Date("2025-06-17")),
            endDate: Timestamp.fromDate(new Date("2025-08-17")),
          };
          return addTrip(newTripData).then(newTripId => {
            expect(newTripId).not.toBeNull();
            expect(typeof newTripId).toBe('string');

            if (newTripId) {
              return getTripById(newTripId).then(fetchedTrip => {
                expect(fetchedTrip).not.toBeNull();
                if (fetchedTrip) {
                  expect(fetchedTrip.tripName).toBe(newTripData.tripName);
                  expect(fetchedTrip.userId).toBe(testUser.uid);
                }
              });
            }
          });
        });

        test('should return null when no user is signed in', () => {
          return signOut(auth)
            .then(() => {
              const newTripData = {
                tripName: "Trip That Should Fail",
                location: "Nowhere",
                cost: 0,
                startDate: Timestamp.fromDate(new Date("2025-06-17")),
                endDate: Timestamp.fromDate(new Date("2025-08-17")),
              };
              return addTrip(newTripData);
            })
            .then(result => {
              expect(result).toBeNull();
            });
        });

      });

      describe('addFlight', () => {
        test('should add a new flight to a trip and return the new flight ID', () => {
          const newFlightData = {
            departureLocation: 'Manchester',
            arrivalLocation: 'Timbuk to',
            airline: 'EasyJet',
            cost: 120,
            departureTime: Timestamp.fromDate(new Date("2025-08-01T10:00:00Z")),
            arrivalTime: Timestamp.fromDate(new Date("2025-08-01T11:30:00Z")),
            isBooked: false,
            stops: [],
          };

          return addFlight(SAMPLE_TRIP_1_TRIP_ID, newFlightData)
            .then(newFlightId => {
              expect(newFlightId).not.toBeNull();
              expect(typeof newFlightId).toBe('string');

              if (newFlightId) {
                return getFlightsByTrip(SAMPLE_TRIP_1_TRIP_ID).then(flights => {
                  expect(flights).not.toBeNull();
                  if (flights) {
                    const newFlight = flights.find(f => f.id === newFlightId);
                    expect(newFlight).toBeDefined();
                    expect(newFlight?.airline).toBe('EasyJet');
                    expect(newFlight?.userId).toBe(testUser.uid);
                  }
                });
              }
            });
        });

        test('should return null when no user is signed in', () => {
          return signOut(auth)
            .then(() => {
              const newFlightData = {
                departureLocation: 'Unknown',
                arrivalLocation: 'Nowhere',
                cost: 0,
                departureTime: Timestamp.now(),
                arrivalTime: Timestamp.now(),
                isBooked: false,
                stops: [],
              };
              return addFlight(SAMPLE_TRIP_1_TRIP_ID, newFlightData);
            })
            .then(result => {
              expect(result).toBeNull();
            });
        });

      });

    describe('addAccom', () => {

      test('should add a new accommodation to a trip and return the new accommodation ID', () => {
        const newAccomData = {
          name: 'The Grand Test Hotel',
          location: 'Testville',
          cost: 350,
          rooms: 1,
          beds: 1,
          stars: 5,
          description: 'A luxurious test hotel.',
          isBooked: true,
          startDate: Timestamp.fromDate(new Date("2025-08-01")),
          endDate: Timestamp.fromDate(new Date("2025-09-01")),
        };

        return addAccom(SAMPLE_TRIP_1_TRIP_ID, newAccomData)
          .then(newAccomId => {
            expect(newAccomId).not.toBeNull();
            expect(typeof newAccomId).toBe('string');

            if (newAccomId) {
              return getAccomById(newAccomId).then(fetchedAccom => {
                expect(fetchedAccom).not.toBeNull();
                if (fetchedAccom) {
                    expect(fetchedAccom.name).toBe('The Grand Test Hotel');
                    expect(fetchedAccom.userId).toBe(testUser.uid);
                    expect(fetchedAccom.tripId).toBe(SAMPLE_TRIP_1_TRIP_ID);
                }
              });
            }
          });
      });

      test('should return null when no user is signed in', () => {
        return signOut(auth)
          .then(() => {
            const newAccomData = {
              name: 'Unauthenticated Inn',
              location: 'Nowhere',
              cost: 50,
              rooms: 1,
              beds: 1,
              stars: 1,
              description: 'A test hotel that should not be added.',
              isBooked: false,
            };
            return addAccom(SAMPLE_TRIP_1_TRIP_ID, newAccomData);
          })
          .then(result => {
            expect(result).toBeNull();
          });
      });

    })

    describe('addActivity', () => {

      const getActivityById = (id: string): Promise<Activity | null> => {
        return getDoc(doc(db, "activities", id)).then(docSnap => {
          if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as Activity;
          }
          return null;
        });
      };

      test('should add a new activity to a trip and return the new activity ID', () => {
        const newActivityData = {
          description: 'Go on a walk',
          location: 'City Center',
          cost: 35,
          isBooked: true,
          startTime: Timestamp.fromDate(new Date("2025-08-03T10:00:00Z")),
          endTime: Timestamp.fromDate(new Date("2025-08-03T10:20:00Z")),
        };

        return addActivity(SAMPLE_TRIP_1_TRIP_ID, newActivityData)
          .then(newActivityId => {
            expect(newActivityId).not.toBeNull();
            expect(typeof newActivityId).toBe('string');

            if (newActivityId) {
              return getActivityById(newActivityId).then(fetchedActivity => {
                expect(fetchedActivity).not.toBeNull();
                if (fetchedActivity) {
                    expect(fetchedActivity.description).toBe('Go on a walk');
                    expect(fetchedActivity.userId).toBe(testUser.uid);
                    expect(fetchedActivity.tripId).toBe(SAMPLE_TRIP_1_TRIP_ID);
                }
              });
            }
          });
      });

      test('should return null when no user is signed in', () => {
        return signOut(auth)
          .then(() => {
            const newActivityData = {
              description: 'This should fail',
              location: 'Nowhere',
              cost: 0,
              isBooked: false,
            };
            return addActivity(SAMPLE_TRIP_1_TRIP_ID, newActivityData);
          })
          .then(result => {
            expect(result).toBeNull();
          });
      });
    });
    
});

describe('UPDATE', () => {
  
  describe('updateTripDetails', () => {
    test('should update specified fields of an existing trip', () => {
      const updates = {
        tripName: "Updated paris",
        cost: 1500,
      };

      return updateTripDetails(SAMPLE_TRIP_1_TRIP_ID, updates)
        .then(success => {
          expect(success).toBe(true);
          return getTripById(SAMPLE_TRIP_1_TRIP_ID);
        })
        .then(updatedTrip => {
          expect(updatedTrip).not.toBeNull();
          if (updatedTrip) {
            expect(updatedTrip.tripName).toBe("Updated paris");
            expect(updatedTrip.cost).toBe(1500);
            expect(updatedTrip.location).toBe(sampleTrip1.location);
            expect(updatedTrip.updatedAt.isEqual(updatedTrip.createdAt)).toBe(false);
          }
        });
    });

    test('should return false when trying to update a non-existent trip', () => {
      const updates = { tripName: "This should fail" };
      return updateTripDetails("non-existent-id", updates)
        .then(success => {
          expect(success).toBe(false);
        });
    });
  });

  describe('updateActivityDetails', () => {
    test('should update fields of an existing activity', () => {
        const activityIdToUpdate = "activity1";
        const updates = {
            description: "The Lourve smells!",
            cost: 25,
        };
        
        return updateActivityDetails(activityIdToUpdate, updates)
            .then(success => {
                expect(success).toBe(true);
                return getActivityById(activityIdToUpdate);
            })
            .then(updatedActivity => {
                expect(updatedActivity).not.toBeNull();
                if (updatedActivity) {
                    expect(updatedActivity.description).toBe("The Lourve smells!");
                    expect(updatedActivity.cost).toBe(25);
                }
            });
    });

    test('should return false when updating a non-existent activity', () => {
        const updates = { description: "Non-existent activity" };
        return updateActivityDetails("non-existent-activity-id", updates)
            .then(success => {
                expect(success).toBe(false);
            });
    });
  });

  describe('updateFlightDetails', () => {
    test('should update fields of an existing flight', () => {
        const flightIdToUpdate = "flight1";
        const updates = {
            airline: "Updated Airlines",
            cost: 300,
        };

        return updateFlightDetails(flightIdToUpdate, updates)
            .then(success => {
                expect(success).toBe(true);
                return getFlightById(flightIdToUpdate);
            })
            .then(updatedFlight => {
                expect(updatedFlight).not.toBeNull();
                if (updatedFlight) {
                    expect(updatedFlight.airline).toBe("Updated Airlines");
                    expect(updatedFlight.cost).toBe(300);
                }
            });
    });

    test('should return false when updating a non-existent flight', () => {
        const updates = { airline: "Phantom Air" };
        return updateFlightDetails("non-existent-flight-id", updates)
            .then(success => {
                expect(success).toBe(false);
            });
    });
  });

  describe('updateAccomDetails', () => {
    xtest('should update specified fields of an existing accommodation', () => {
      const accomIdToUpdate = "accom1";
      const updates = {
        name: "Shack",
        isBooked: false,
      };

      return updateAccomDetails(accomIdToUpdate, updates)
        .then(success => {
            expect(success).toBe(true);
            return getAccomById(accomIdToUpdate);
        })
        .then(updatedAccom => {
            expect(updatedAccom).not.toBeNull();
            if (updatedAccom) {
                expect(updatedAccom.name).toBe("Shack");
                expect(updatedAccom.isBooked).toBe(false);
            }
        });
    });

    test('should return false when trying to update a non-existent accommodation', () => {
        const updates = { name: "Imaginary Hotel" };
        return updateAccomDetails("non-existent-accom-id", updates)
            .then(success => {
                expect(success).toBe(false);
            });
    });
  });

});

describe('DELETE', () => {
    test('deleteTrip should remove a trip document from the database', () => {
      return deleteTrip(SAMPLE_TRIP_1_TRIP_ID)
        .then(success => {
          expect(success).toBe(true);
          return getDoc(doc(db, "trips", SAMPLE_TRIP_1_TRIP_ID));
        })
        .then(tripSnap => {
          expect(tripSnap.exists()).toBe(false);
        });
    });

    test('deleteAccom should remove an accommodation document from the database', () => {
      return deleteAccom('accom1')
        .then(success => {
          expect(success).toBe(true);
          return getDoc(doc(db, "accommodations", 'accom1'));
        })
        .then(accomSnap => {
          expect(accomSnap.exists()).toBe(false);
        });
    });

    test('deleteFlight should remove a flight document from the database', () => {
      return deleteFlight('flight1')
        .then(success => {
          expect(success).toBe(true);
          return getDoc(doc(db, "flights", 'flight1'));
        })
        .then(flightSnap => {
          expect(flightSnap.exists()).toBe(false);
        });
    });

    test('deleteActivity should remove an activity document from the database', () => {
      return deleteActivity('activity1')
        .then(success => {
          expect(success).toBe(true);
          return getDoc(doc(db, "activities", 'activity1'));
        })
        .then(activitySnap => {
          expect(activitySnap.exists()).toBe(false);
        });
    });

    test('deleteTrip should return true even for a non-existent document', () => {
      return deleteTrip("non-existent-id")
        .then(success => {
          expect(success).toBe(true);
        });
    });
  });
  
  
  console.log("--------------Note: you need to reset the emulators after every test, or some will fail---------------------------------")