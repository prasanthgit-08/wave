import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("accessToken"),
    token: localStorage.getItem("token"),
    menuList: localStorage.getItem("menuList") || [],
    loggedInUserData: JSON.parse(localStorage.getItem("loggedInUserData")) || null,
  },
  reducers: {
    loginUser: (state, { payload }) => {
      // localStorage.setItem('token', payload);
      state.isLoggedIn = true;
      state.token = payload;

      state.loggedInUserData = payload?.usersData;
    },
    logoutUser: (state) => {
      // localStorage.removeItem('token');
      state.isLoggedIn = false;
      state.token = null;
      state.loggedInUserData = null;
    },
    setMenuList: (state, action) => {
      state.menuList = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setMenuList } = AuthSlice.actions;

export default AuthSlice.reducer;
