import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const mainURL = "https://profiled-notes-json-server.herokuapp.com/users";

const initialState = {
  logged: false,
  currentUser: {},
  loading: false,
};

// export const loginCurrentUser: any = createAsyncThunk(
//   "currentUserLogin",
//   async (arg: any, { rejectWithValue }) => {
//     try {
//       const res = await axios.get(
//         `${mainURL}?email=${arg.email}&password=${arg.password}`
//       );
//       const user = await res.data;
//       console.log(user);
//       if (user === null) {
//         return null;
//       } else {
//         return user;
//       }
//     } catch (error: any) {
//       console.log(error.message);
//       return rejectWithValue(error.message);
//     }
//   }
// );

export const deleteCurrentUserAccount: any = createAsyncThunk(
  "delCurrentUserAcc",
  async (arg: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${mainURL}/${arg.id}`);
      const data = await res.data;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginCurrentUser: any = createAsyncThunk(
  "currentUserLogin",
  async (arg: any, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${mainURL}`);
      const user = await res.data;
      const loggedCurrentUser = user.find(
        (x: any) => x.email === arg.email && x.password === arg.password
      );
      if (loggedCurrentUser === undefined) {
        return null;
      } else {
        return loggedCurrentUser;
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState,
  reducers: {
    signOutCurrentUser: (state: any) => {
      state.currentUser = [];
      state.logged = false;
      state.loading = false;
    },
  },
  extraReducers: {
    [loginCurrentUser.pending]: (state) => {
      state.loading = true;
      state.logged = false;
    },
    [loginCurrentUser.fulfilled]: (state, { payload }) => {
      state.currentUser = payload;
      state.logged = payload === null ? false : true;
      state.loading = false;
    },
    [loginCurrentUser.rejected]: (state) => {
      state.currentUser = [];
      state.loading = false;
      state.logged = false;
    },
    [deleteCurrentUserAccount.pending]: (state) => {
      state.loading = true;
      state.logged = false;
    },
    [deleteCurrentUserAccount.fulfilled]: (state) => {
      state.loading = false;
      state.logged = false;
      state.currentUser = [];
    },
    [deleteCurrentUserAccount.rejected]: (state) => {
      state.loading = true;
      state.logged = true;
    },
  },
});
export const { signOutCurrentUser } = currentUserSlice.actions;
