import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const mainURL = "https://profiled-notes-json-server.herokuapp.com/users";
// const navigate = useNavigate();

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
export const deleteNoteFromCurrentUser: any = createAsyncThunk(
  "delNoteFromUser",
  async (arg: any, thunkAPI) => {
    const res = await axios.patch(`${mainURL}/${arg.id}`, {
      notes: arg.notes.filter(
        (x: any) =>
          x.noteBody !== arg.note.noteBody || x.noteTitle !== arg.note.noteTitle
      ),
    });
    const data = res.data;

    thunkAPI.dispatch(
      loginCurrentUser({
        email: arg.email,
        password: arg.password,
      })
    );

    return data;
  }
);

export const addNoteToCurrentUser: any = createAsyncThunk(
  "addNoteToUser",
  async (arg: any, thunkAPI) => {
    if (
      arg.currentUser.notes.filter(
        (x: any) =>
          x.noteBody === arg.note.noteBody && x.noteTitle === arg.note.noteTitle
      ).length > 0
    ) {
      /* notes contains the element we're looking for */
      alert("the exact same note with title and body's already created");
    } else {
      try {
        const res = await axios.patch(`${mainURL}/${arg.currentUser.id}`, {
          notes: [
            ...arg.currentUser.notes,
            {
              noteTitle: arg.note.noteTitle,
              noteBody: arg.note.noteBody,
              noteColor: arg.note.noteColor,
            },
          ],
        });
        const data = await res.data;

        thunkAPI.dispatch(
          loginCurrentUser({
            email: arg.currentUser.email,
            password: arg.currentUser.password,
          })
        );

        return data;
      } catch (error: any) {
        return error.message;
      }
    }
    ////////////////////////////////////////////
  }
);

export const deleteCurrentUserAccount: any = createAsyncThunk(
  "delCurrentUserAcc",
  async (arg: any, { rejectWithValue }) => {
    try {
      localStorage.clear();
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

      localStorage.setItem("email", arg.email);
      localStorage.setItem("password", arg.password);

      if (loggedCurrentUser === undefined) {
        localStorage.clear();

        return null;
      } else {
        if (arg.rememberMe) {
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("email", arg.email);
          localStorage.setItem("password", arg.password);
        }
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
      localStorage.setItem("autoLog", "false");
      if (localStorage.getItem("rememberMe") !== "true") {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
    },
  },
  extraReducers: {
    [loginCurrentUser.pending]: (state) => {
      state.loading = true;
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
