import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
const DOGS_URL = "http://localhost:5000/breeds";

const initialState = {
  breeds: [],
  allBreeds: [],
  breedsById: [],
  status: "idle",
  error: null,
};
export const dogsFetch = createAsyncThunk("breeds/fetchDogs", async () => {
  try {
    const response = await axios.get(DOGS_URL);

    return response.data;
  } catch (error) {
    console.log(error);
  }
});
export const dogsFetchById = createAsyncThunk(
  "breeds/fetchDogsById",
  async (id) => {
    try {
      const response = await axios.get(`${DOGS_URL}/${id}`);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const addNewBreed = createAsyncThunk(
  "breeds/addNewBreed",
  async (initialBreed) => {
    const response = await axios.post(DOGS_URL, initialBreed);
    return response.data;
  }
);
export const deleteBreed = createAsyncThunk(
  "breeds/deleteBreed",
  async (id) => {
    try {
      const response = await axios.delete(`${DOGS_URL}/${id}`);

      return response.dat;
    } catch (err) {
      return err.message;
    }
  }
);

const breedsSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {
    cleanBreeds: (state, action) => {
      return {
        ...state,
        allBreeds: action.payload,
      };
    },
    cleanBreedDetails: (state, action) => {
      state.breedsById = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(dogsFetch.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(dogsFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.breeds = action.payload;
        state.allBreeds = action.payload;
      })
      .addCase(dogsFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(dogsFetchById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(dogsFetchById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.breedsById = action.payload;
      })
      .addCase(dogsFetchById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewBreed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addNewBreed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.breeds.push(action.payload);
      })
      .addCase(addNewBreed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteBreed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteBreed.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (!action.payload?.id) {
          console.log("Delete could not complete");
          console.log(action.payload);
          return;
        }
        const { id } = action.payload;

        const allBreeds2 = state.allBreeds;
        const deleteBreed = allBreeds2.filter((breed) => breed.id !== id);
        return {
          ...state,
          breeds: deleteBreed,
        };
        // state.breeds = deleteBreed;
        // state.allBreeds = deleteBreed;
      })
      .addCase(deleteBreed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { cleanBreeds, cleanBreedDetails } = breedsSlice.actions;
export default breedsSlice.reducer;
