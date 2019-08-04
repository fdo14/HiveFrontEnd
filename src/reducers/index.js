import { combineReducers } from "redux";

import movieReducer from "./movieReducer";
import userReducer from "./userReducer";

export default combineReducers({
  movie: movieReducer,
  user: userReducer
});
