import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
const USER_URL = "http://localhost:5000/users";
const initialState = {
  token: localStorage.getItem("token"),
  name: "",
  email: "",
  _id: "",
  registerStatus: "",
  registerError: "",
  loginStatus: "",
  loginError: "",
  userLoaded: false,
  favorites: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : [],

  status: "idle",
  error: null,
};
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${USER_URL}/register`, {
        name: user.name,
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const token = await axios.post(`${USER_URL}/login`, {
        email: user.email,
        password: user.password,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (err) {
      console.log(err.response.data);
      return rejectWithValue(err.response.data);
    }
  }
);
export const addFavoriteBreed = createAsyncThunk(
  "auth/addFavoriteBreed",
  async (payload) => {
    try {
      const response = await axios.put(`${USER_URL}/add-favorites`, payload);

      return response.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);
export const removeFavoriteBreed = createAsyncThunk(
  "auth/removeFavoriteBreed",
  async (payload) => {
    try {
      const response = await axios.put(`${USER_URL}/remove-favorites`, payload);

      return response.data;
    } catch (err) {
      console.log(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUser(state, action) {
      const token = state.token;
      if (token) {
        const user = jwtDecode(token);
        return {
          ...state,
          token,
          name: user.name,
          email: user.email,
          _id: user._id,
          userLoaded: true,
        };
      }
    },
    logoutUser(state, action) {
      localStorage.removeItem("token");
      return {
        ...state,
        token: "",
        name: "",
        email: "",
        _id: "",
        registerStatus: "",
        registerError: "",
        loginStatus: "",
        loginError: "",
        userLoaded: false,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      return { ...state, registerStatus: "pending" };
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          password: user.password,
          _id: user._id,
          registerStatus: "sucess",
        };
      } else {
        return state;
      }
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      return {
        ...state,
        registerStatus: "rejected",
        registerError: action.payload,
      };
    });
    builder.addCase(loginUser.pending, (state, action) => {
      return { ...state, loginStatus: "pending" };
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload) {
        const user = jwtDecode(action.payload);
        return {
          ...state,
          token: action.payload,
          name: user.name,
          email: user.email,
          password: user.password,
          _id: user._id,
          loginStatus: "sucess",
        };
      } else {
        return state;
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      return {
        ...state,
        loginStatus: "rejected",
        loginError: action.payload,
      };
    });
    builder.addCase(addFavoriteBreed.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addFavoriteBreed.fulfilled, (state, action) => {
      state.status = "succeeded";
      const breedId = action.meta.arg.breedId;
      if (!state.favorites.includes(breedId)) {
        state.favorites.push(breedId);

        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    });
    builder.addCase(addFavoriteBreed.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(removeFavoriteBreed.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(removeFavoriteBreed.fulfilled, (state, action) => {
      state.status = "succeeded";
      const breedId = action.meta.arg.breedId;
      if (state.favorites.includes(breedId)) {
        state.favorites = state.favorites.filter((id) => id !== breedId);

        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    });
    builder.addCase(removeFavoriteBreed.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});
export const { loadUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
