// import { configureStore,combineReducers } from "@reduxjs/toolkit";
// // import AuthSlice from "./AuthSlice";
// import authSlice from "./slices/authSlice"

// const combinedReducer = combineReducers({
//   userAuth: authSlice,
// });

// const rootReducer = (state, action) => {
//   if (action.type === "Reset") {
//     // state = undefined;
//     state.dealerSearchReducer.selectedDealerStatus = undefined;
//     state.dealerSearchReducer.selectedStatus = undefined;
//     // state.editDealerReducer.dealerData = undefined;
//   }
//   return combinedReducer(state, action);
// };

// export const stores = configureStore(
//   {
//     reducer: rootReducer,
//   },
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

import userAuthSlice from "./slices/userAuth.slice";
import unitSlice from "./slices/unit.slice";

export const refactoredSlice = {
  userAuth: userAuthSlice,
  unit: unitSlice,
};
