import { combineReducers } from "redux";
import hotelsReducer from "./searchHotels";

const reducers = combineReducers({hotels_searching : hotelsReducer});

export default reducers;