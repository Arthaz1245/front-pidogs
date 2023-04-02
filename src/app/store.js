import { configureStore } from "@reduxjs/toolkit";
import breedsReducer from "../features/breedsSlice";
import TemperamentsReducer from "../features/TemperamentsSlice";
import authReducer, { loadUser } from "../features/authSlice";
export const store = configureStore({
  reducer: {
    breeds: breedsReducer,
    temperaments: TemperamentsReducer,
    auth: authReducer,
  },
});
store.dispatch(loadUser(null));
