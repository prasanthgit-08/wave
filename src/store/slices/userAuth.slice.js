import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// import ROLES from "../../config/roles";
import AuthService from "../../service/auth/auth.service";
import { loginUser } from "../../redux/AuthSlice";

const initialState = {
  isLoggedIn: false,
  loading: false,
  isAppInitialized: false,
  error: "",
  token: localStorage.getItem("token"),
  menuList: localStorage.getItem("menuList") || [],
  loggedInUserData: JSON.parse(localStorage.getItem("loggedInUserData")) || null,
};

export const login = createAsyncThunk(
  "/login",
  async ({ username, password }, { rejectWithValue, dispatch }) => {
    try {
      const response = await AuthService.login(username, password);
      const { data } = response;
      if (data?.errorModel?.errorCode === "1" && data?.errorModel?.errorMessage) {
        throw new Error(data?.errorModel?.errorMessage);
      } else {
        toast.success("Login Successful!");
        localStorage.removeItem("logout");
        localStorage.setItem("username", username);
        localStorage.setItem("usernameInDB", data?.usersData?.name);
        localStorage.setItem("forcePasswordChange", data?.usersData?.forcePasswordChange);
        localStorage.setItem("accessToken", data?.tokens.accessToken);
        localStorage.setItem("refreshToken", data?.tokens.refreshToken);
        localStorage.setItem("accessTokenExpiry", data?.tokens.accessToken_exp);
        localStorage.setItem("refreshTokenExpiry", data?.tokens.refreshToken_exp);
        const tokenExpiryTime = Date.now() + data?.tokens.accessToken_exp * 60 * 1000;
        localStorage.setItem("tokenExpiryTime", tokenExpiryTime);
        localStorage.setItem("tokenSetTime", Date.now());
        localStorage.setItem("menuList", JSON.stringify(data?.menuList || []));
        localStorage.setItem("loggedInUserData", JSON.stringify(data?.usersData || null));
        localStorage.setItem("deniedPermissions", JSON.stringify(data?.deniedPermissions || []));
        dispatch(loginUser(data));
        return data;
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
      return rejectWithValue(err.message || "Something went wrong");
    }
  }
);

export const logout = createAsyncThunk("/logout", async (username, { rejectWithValue, dispatch }) => {
  try {
    // if (role === ROLES.AGENT) {
    const response = await AuthService.logout(username);
    if (response?.errorModel?.errorCode === "0") {
      localStorage.clear();
      toast.success("Logout Successful!");
    } else {
      throw new Error(response?.message || "");
    }
    // }
    // localStorage.removeItem("access_token");
    // localStorage.removeItem("refresh-token");
    // localStorage.removeItem("user");

    //   dispatch(replace(AUTH.BASE_PATH));
    //   return true;
  } catch (err) {
    toast.error(err.message || "Something went wrong!");
    return rejectWithValue(err.message || "Something went wrong");
  }
});

export const checkAuthorization = createAsyncThunk(
  "/checkAuthorization",
  (_, { dispatch, rejectWithValue }) => {
    try {
      //for new sessions is token is available user will be logged in automatically
      const tmpAT = localStorage.getItem("accessToken") ?? "";
      // const tmpRT = localStorage.getItem("refresh-token") ?? "";
      const tmpUserStr = localStorage.getItem("loggedInUserData") ?? "";
      if (tmpAT && tmpUserStr) {
        let usr = JSON.parse(tmpUserStr);
        return usr;
      } else {
        return rejectWithValue("No token found");
        // throw new Error();
      }
    } catch (err) {
      rejectWithValue(err.message || "Something went wrong");
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = "";
    },
    setInitialized(state) {
      state.isAppInitialized = true;
    },
    setLoggedInUserData(state, action) {
      state.loggedInUserData = action.payload;
    },
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkAuthorization.pending, (state) => {
      state.isLoggedIn = false;
      state.isAppInitialized = false;
    });
    builder.addCase(checkAuthorization.fulfilled, (state, action) => {
      state.loggedInUserData = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(checkAuthorization.rejected, (state) => {
      state.loggedInUserData = {};
      state.isLoggedIn = false;
      state.isAppInitialized = true;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.loggedInUserData = null;
      state.isLoggedIn = false;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.error = "";
      state.isLoggedIn = true;
      state.loading = false;
      state.loggedInUserData = action.payload?.usersData || {};
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action?.payload || "";
      //   state.isAppInitialized = true;
      state.isLoggedIn = false;
      state.loading = false;
    });
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.loggedInUserData = null;
      // state.profile = {};
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.loggedInUserData = null;
      // state.profile = {};
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
      state.error = "something went wrong";
    });
  },
});

export const { clearError, setInitialized, setLoggedInUserData, setIsLoggedIn } = userAuthSlice.actions;
export default userAuthSlice.reducer;
