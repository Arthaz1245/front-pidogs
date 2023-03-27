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

      return response.data;
    } catch (err) {
      return err.message;
    }
  }
);
export const searchBreed = createAsyncThunk(
  "breeds/searchBreed",
  async (name) => {
    try {
      const response = await axios.get(`${DOGS_URL}?name=${name}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

const breedsSlice = createSlice({
  name: "breeds",
  initialState,
  reducers: {
    cleanBreeds: (state, action) => {
      state.allBreeds = [];
    },
    cleanBreedDetails: (state, action) => {
      state.breedsById = [];
    },
    cleanSearchBreed: (state, action) => {
      state.breedsByName = [];
    },
    filterBreedsByTemperament: (state, action) => {
      const allBreeds = state.allBreeds;
      const filteredBreeds =
        action.payload === "all"
          ? allBreeds
          : allBreeds.filter((breed) => {
              if (typeof breed.temperaments === "string")
                return breed.temperaments.includes(action.payload);
              if (Array.isArray(breed.temperaments)) {
                let temps = breed.temperaments.map((e) =>
                  e.name ? e.name : e
                );
                return temps.includes(action.payload);
              }
              return true;
            });

      return {
        ...state,
        breeds: filteredBreeds,
      };
    },
    orderByWeight: (state, action) => {
      const orderByWeight =
        action.payload === "asc"
          ? state.breeds.sort(function (a, b) {
              return parseInt(a.min_weight) - parseInt(b.max_weight);
            })
          : state.breeds.sort(function (a, b) {
              return parseInt(b.max_weight) - parseInt(a.min_weight);
            });
      return {
        ...state,
        breeds: orderByWeight,
      };
    },
    orderAlphabetically: (state, action) => {
      let orderAlphabetical = [...state.breeds];
      orderAlphabetical =
        action.payload === "asc"
          ? state.breeds.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.breeds.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return { ...state, breeds: orderAlphabetical };
    },
    filterBreedsCreated: (state, action) => {
      let copy = state.allBreeds;
      let createdFiltered;
      if (action.payload === "created") {
        let searchCreated = copy.filter((e) => e.createdInDB);

        createdFiltered = searchCreated;
        if (!createdFiltered.length) return "Ther aren not created";
      } else if (action.payload === "api") {
        createdFiltered = copy.filter((e) => !e.createdInDB);
      } else {
        createdFiltered = copy;
      }
      return {
        ...state,
        breeds: createdFiltered,
      };
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

        const { id } = action.payload;

        const allBreeds2 = state.allBreeds;
        const deleteBreed = allBreeds2.filter((breed) => breed.id !== id);
        state.breeds = deleteBreed;
      })
      .addCase(deleteBreed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchBreed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(searchBreed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.breeds = action.payload;
      })
      .addCase(searchBreed.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {
  cleanBreeds,
  cleanBreedDetails,
  filterBreedsByTemperament,
  filterBreedsCreated,
  cleanSearchBreed,
  orderByWeight,
  orderAlphabetically,
} = breedsSlice.actions;
export default breedsSlice.reducer;
