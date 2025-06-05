File downloaded from https://github.com/jbrooksuk/JSON-Airports/blob/master/airports.json

Nearly 1.6 gb, so use useEffect as shown:

import React, { useState, useEffect } from "react";

function AirportComponent() {
  const [airports, setAirports] = useState([]);  
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadAirports = async () => {
      const json = require("../assets/data/airports.json");
      setAirports(Object.values(json));
      setLoading(false);
    };
    loadAirports();
  }, []);

}