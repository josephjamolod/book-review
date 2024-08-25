import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CurrentUserType {
  createdAt: string;
  email: string;
  updatedAt: string;
  username: string;
  __v: number;
  _id: string;
}

interface InitialStateType {
  loading: boolean;
  error: boolean | string;
  currentUser: null | CurrentUserType;
  toggle: Date | boolean;
}

const initialState: InitialStateType = {
  loading: false,
  error: false,
  currentUser: null,
  toggle: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInUserStart: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = false;
    },
    signInUserSuccess: (
      state,
      action: PayloadAction<null | CurrentUserType>
    ) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    signInUserFailure: (state, action: PayloadAction<boolean | string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutUserStart: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = false;
    },
    signOutUserSuccess: (state) => {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.currentUser = initialState.currentUser;
    },
    signOutUserFailure: (state) => {
      state.loading = false;
    },
    updateUserStart: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = false;
    },
    updateUserSuccess: (
      state,
      action: PayloadAction<null | CurrentUserType>
    ) => {
      state.loading = false;
      state.error = false;
      state.currentUser = action.payload;
    },
    updateUserFailure: (state, action: PayloadAction<boolean | string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkUser: (state) => {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.currentUser = initialState.currentUser;
    },
    toggle: (state, action: PayloadAction<boolean | Date>) => {
      state.toggle = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  signInUserStart,
  signInUserSuccess,
  signInUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  checkUser,
  toggle,
} = userSlice.actions;
