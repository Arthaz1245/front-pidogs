import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
//const TEMPERAMENTS_URL = "https://backpidogs.onrender.com/temperaments";
const TEMPERAMENTS_URL = "http://localhost:5000/temperaments";

const initialState = {
  temperaments: [],
  status: "idle",
  error: null,
};
export const temperamentsFetch = createAsyncThunk(
  "temperaments/fetchTemperaments",
  async () => {
    try {
      const response = await axios.get(TEMPERAMENTS_URL);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const temperamentsSlice = createSlice({
  name: "temperaments",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(temperamentsFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(temperamentsFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.temperaments = action.payload;
      })
      .addCase(temperamentsFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default temperamentsSlice.reducer;
