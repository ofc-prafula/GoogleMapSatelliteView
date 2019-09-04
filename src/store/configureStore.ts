import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import { History } from "history";
import { IApplicationState, reducers } from "./index";
import { IFeatureComponent, IFeatureToggle } from "./features/types";
import { initialState as initialStateAuth } from "./auth/reducers";
import { initialState as initialStatePage } from "./page/reducers";
import { initialState as initialStateSearch } from "./search/reducers";
import { initialState as initialStateFilters } from "./searchFilters/reducers";
import { initialState as initialStateSorting } from "./searchSorting/reducers";
import { initialState as initialStateFiles } from "./files/reducers";
import { initialState as initialStateFastWindow } from "./fastWindow/reducers";
// import { initialState as initialStateUniversalWireAccounts } from "./universalWireAccounts/reducers";
import { initialState as initialStateUi } from "./ui/reducers";
import { initialState as initialStateOrder } from "./orders/reducers";
// import { initialState as initialWireInstructions } from "./wireInstructions/reducers";
import { initialState as initialGoogleMap } from "./googleMap/reducers";
import { initialState as initialPropertySearch } from "./propertySearch/reducers";
// import { initialState as initialDashboard } from "./dashboard/reducers";
// import { initialState as initialPermissions } from "./permissions/reducers";

import { composeWithDevTools } from "redux-devtools-extension";

import apiMiddleware from "./middleware/api";
// import wireInstructionsMiddleware from "./middleware/wireInstructions";

export default function configureStore(history: History) {
  const enhancers = [];
  const middleware = [
    thunk,
    routerMiddleware(history),
    apiMiddleware,
    wireInstructionsMiddleware
  ];

  const composer =
    process.env.NODE_ENV !== "production"
      ? composeWithDevTools({}) || compose
      : compose;

  const composedEnhancers = composer(
    applyMiddleware(...middleware),
    ...enhancers
  );
  const initialState: IApplicationState = {
    users: {
      loading: false,
      error: null,
      resultsById: {},
      pagination: null,
      query: null
    },
    offices: {
      error: null,
      resultsById: {}
    },
    regions: {
      error: null,
      resultsById: {}
    },
    form: undefined,
    router: undefined,
    notifications: {
      visible: false,
      tileProps: null,
      autohide: false
    },
    groups: {
      error: null,
      resultsById: {},
      loading: false
    },
    features: {
      error: null,
      loading: false,
      components: [],
      features: [],
      component: {} as IFeatureComponent,
      feature: {} as IFeatureToggle
    },
    auth: { ...initialStateAuth },
    page: { ...initialStatePage },
    search: { ...initialStateSearch },
    filters: { ...initialStateFilters },
    sorting: { ...initialStateSorting },
    files: { ...initialStateFiles },
    fastSystem: { ...initialStateFastWindow },
    universalWireAccounts: { ...initialStateUniversalWireAccounts },
    ui: { ...initialStateUi },
    orders: { ...initialStateOrder },
    wireInstructions: { ...initialWireInstructions },
    googleMap: { ...initialGoogleMap },
    propertySearch: { ...initialPropertySearch },
    dashboard: { ...initialDashboard },
    permissions: { ...initialPermissions }
  };

  return createStore(reducers(history), initialState, composedEnhancers);
}
