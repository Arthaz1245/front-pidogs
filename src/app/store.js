import { configureStore } from "@reduxjs/toolkit";
import breedsReducer from "../features/breedsSlice";
import TemperamentsReducer from "../features/TemperamentsSlice";
export const store = configureStore({
  reducer: { breeds: breedsReducer, temperaments: TemperamentsReducer },
});
