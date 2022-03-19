import { combineReducers } from "redux";
import { createPersonReducer, deletePersonReducer, personsReducer } from "./reducers/personsReducer";

export const reducer = combineReducers({
  personsList: personsReducer,
  personCreate: createPersonReducer,
  personDelete: deletePersonReducer,
});
