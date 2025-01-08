import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1";

export const getWeatherByName = createAsyncThunk(
  "weather/getWeather",
  async (city, thunkAPI) => {

    try {
        let coordinates = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
        );
        let { latitude, longitude } = coordinates.data.results[0];
  
      const params = {
        latitude: latitude,
        longitude: longitude,
        hourly: "temperature_2m,rain,snowfall,cloud_cover_mid,cloud_cover_high,wind_speed_10m",
        forecast_days: 2,
      };
      const response = await axios.get(`${BASE_URL}/forecast`, { params });
      console.log(response.data);
      
      let temperature = [];
      const { temperature_2m, rain, snowfall, wind_speed_10m } = response.data.hourly;
      for (let i = 3; i <= 45; i += 3) {
        temperature.push({ time: i, temp: temperature_2m[i], rein: rain[i], snowfall: snowfall[i], speed: wind_speed_10m[i] });
      }

      return temperature;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getWeatherByCoordinates = createAsyncThunk(
  "weather/getWeatherByCoordinates",
  async (coordinates, thunkAPI) => {

    try {
      const params = {
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        hourly: "temperature_2m,rain,snowfall,cloud_cover_mid,cloud_cover_high,wind_speed_10m",
        forecast_days: 2,
      };
      const response = await axios.get(`${BASE_URL}/forecast`, { params });
      console.log(response.data);
      
      let temperature = [];
      const { temperature_2m, rain, snowfall, wind_speed_10m } = response.data.hourly;
      for (let i = 3; i <= 45; i += 3) {
        temperature.push({ time: i, temp: temperature_2m[i], rein: rain[i], snowfall: snowfall[i], speed: wind_speed_10m[i] });
      }

      return temperature;
    } catch (error) {
      thunkAPI.rejectWithValue(error.message);
    }
  }
);


