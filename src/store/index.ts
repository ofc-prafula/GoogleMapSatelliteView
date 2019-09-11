import { combineReducers, Reducer, AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { connectRouter } from "connected-react-router";
// import { reducer as formReducer } from "redux-form";
import { createBrowserHistory, History } from "history";

import configureStore from "./configureStore";

import { IGoogleMapState } from "./googleMap/types";
import { IPropertySearchState } from "./propertySearch/types";

import googleMapReducer from "./googleMap/reducers";
import propertySearchReducer from "../store/propertySearch/reducers";

export type AsyncAction<T> = ThunkAction<
  Promise<T>,
  IApplicationState,
  any,
  AnyAction
>;
export type Dispatch = ThunkDispatch<IApplicationState, null, AnyAction>;

export interface IApplicationState {
  googleMap: IGoogleMapState;
  propertySearch: IPropertySearchState;
}

export const reducers = (appHistory: History): Reducer<IApplicationState> =>
  combineReducers({
    router: connectRouter(appHistory),
    googleMap: googleMapReducer,
    propertySearch: propertySearchReducer
  });

export const history = createBrowserHistory();
export const store = configureStore(history);
export default store;