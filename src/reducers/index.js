import { combineReducers } from "redux";
import authReducer from "./authReducer";
import streamsReducer from "./streamsReducer";
import { reducer } from "redux-form";

export default combineReducers({
  auth: authReducer,
  form: reducer,
  streams: streamsReducer,
});
