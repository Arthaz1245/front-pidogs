import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//const DOGS_URL = "http://localhost:5000/breeds";
const DOGS_URL = "https://backpidogs.onrender.com/breeds";
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
    return error;
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
      if (response.data.length) {
        return response.data;
      }
    } catch (error) {
      return error.message;
    }
  }
);
export const filterBreedsCreated = createAsyncThunk(
  "breeds/filterCreatedBreed",
  async (created) => {
    try {
      const response = await axios.get(
        `${DOGS_URL}/filterCreated?created=${created}`
      );

      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const filterBreedsByTemperament = createAsyncThunk(
  "breeds/filterBreedsByTemperament",
  async (temperament) => {
    try {
      const response = await axios.get(
        `${DOGS_URL}/filterTemperament?temperament=${temperament}`
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);
export const updateBreed = createAsyncThunk(
  "breeds/updateBreed",
  async (id, initialState) => {
    try {
      const response = await axios.put(`${DOGS_URL}/${id}`, initialState);

      return response.data;
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
      state.allBreeds = [];
    },
    cleanBreedDetails: (state, action) => {
      state.breedsById = [];
    },
    cleanSearchBreed: (state, action) => {
      state.breedsByName = [];
    },
    orderAlphabetically: (state, action) => {
      let orderAlphabetical = state.breeds;
      orderAlphabetical =
        action.payload === "asc"
          ? [...state.breeds].sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : [...state.breeds].sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      state.breeds = orderAlphabetical;
    },
    orderByWeight: (state, action) => {
      const orderWeight =
        action.payload === "asc"
          ? state.breeds.sort(function (a, b) {
              return parseInt(a.min_weight) - parseInt(b.max_weight);
            })
          : state.breeds.sort(function (a, b) {
              return parseInt(b.max_weight) - parseInt(a.min_weight);
            });
      state.breeds = orderWeight;
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
      })
      .addCase(filterBreedsCreated.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(filterBreedsCreated.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.breeds = action.payload;
      })
      .addCase(filterBreedsCreated.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(filterBreedsByTemperament.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(filterBreedsByTemperament.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.breeds = action.payload;
      })
      .addCase(filterBreedsByTemperament.rejected, (state, action) => {
        state.status = "failed";
      })

      .addCase(updateBreed.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateBreed.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.breeds = action.payload;
      })
      .addCase(updateBreed.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  cleanBreeds,
  cleanBreedDetails,
  cleanSearchBreed,
  orderByWeight,
  orderAlphabetically,
} = breedsSlice.actions;
export default breedsSlice.reducer;
