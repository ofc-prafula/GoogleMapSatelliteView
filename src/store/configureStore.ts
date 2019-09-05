import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { History } from "history";
import { IApplicationState, reducers } from "./index";
import { initialState as initialGoogleMap } from "./googleMap/reducers";
import { initialState as initialPropertySearch } from "./propertySearch/reducers";

import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore(history: History) {
  const enhancers = [];
  const middleware = [thunk, routerMiddleware(history)];

  const composer =
    process.env.NODE_ENV !== "production"
      ? composeWithDevTools({}) || compose
      : compose;

  const composedEnhancers = composer(
    applyMiddleware(...middleware),
    ...enhancers
  );
  const initialState: IApplicationState = {
    googleMap: { ...initialGoogleMap },
    propertySearch: { ...initialPropertySearch }
  };

  return createStore(reducers(history), initialState, composedEnhancers);
}
