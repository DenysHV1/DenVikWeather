import { createSlice } from "@reduxjs/toolkit";
import { getWeatherByName, getWeatherByCoordinates } from "./operations";

const initialState = {
  data: [],
  isLoading: false,
  isError: null,
  cityName: "",
  dataStory: [],
};

const handlerRejected = (state, { payload }) => {
  state.isLoading = false;
  state.isError = payload;
};

const handlerPending = (state) => {
  state.isLoading = true;
  state.isError = null;
};

const handlerFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.data = payload;
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,

  reducers: {
    getCityName: (state, { payload }) => {
      state.cityName = payload;
      state.dataStory.push(payload);
    },
  },

  extraReducers: (builder) => {
    builder
      //* ByName
      .addCase(getWeatherByName.pending, handlerPending)
      .addCase(getWeatherByName.fulfilled, handlerFulfilled)
      .addCase(getWeatherByName.rejected, handlerRejected)
      //* ByCoordinates
      .addCase(getWeatherByCoordinates.pending, handlerPending)
      .addCase(getWeatherByCoordinates.fulfilled, handlerFulfilled)
      .addCase(getWeatherByCoordinates.rejected, handlerRejected);
  },
});

export const weatherReducer = weatherSlice.reducer;
export const { getCityName } = weatherSlice.actions;
