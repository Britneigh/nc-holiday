import React, { useState, useEffect, useCallback } from "react";
import {
  getAccessToken,
  getHolidayData,
} from "../api"; 

// Types from your snippet
type TripType = {
  id: string;
  name: string;
  // add more trip details as needed
};

type HotelType = {
  id: string;
  name: string;
  trips: TripType[];
};

type FlightType = {
  id: string;
  origin: string;
  destination: string;
  hotels: HotelType[];
};

interface HolidayDataContextType {
  flights: FlightType[];
  setFlights: React.Dispatch<React.SetStateAction<FlightType[]>>;
  fetchHolidayData: (
    origin: string,
    destination: string,
    date: string,
    passengers?: number
  ) => Promise<void>;
  loading: boolean;
  error: Error | null;
}

const defaultHolidayDataContext: HolidayDataContextType = {
  flights: [],
  setFlights: () => {},
  fetchHolidayData: async () => {},
  loading: false,
  error: null,
};

export const HolidayDataContext = React.createContext<HolidayDataContextType>(
  defaultHolidayDataContext
);

export const HolidayDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [flights, setFlights] = useState<FlightType[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Fetch access token on mount
  useEffect(() => {
    getAccessToken()
      .then((accessToken) => {
        setToken(accessToken);
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  // Function to fetch holiday data and update flights state
  const fetchHolidayData = useCallback(
    async (
      origin: string,
      destination: string,
      date: string,
      passengers = 1
    ) => {
      if (!token) {
        setError(new Error("No access token available"));
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await getHolidayData(token, origin, destination, date, passengers);
        // Assuming `data` is an array of FlightType (or transform it accordingly)
        setFlights(data);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    },
    [token]
  );

  return (
    <HolidayDataContext.Provider
      value={{ flights, setFlights, fetchHolidayData, loading, error }}
    >
      {children}
    </HolidayDataContext.Provider>
  );
};
