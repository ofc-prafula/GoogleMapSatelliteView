import { IGoogleMapState, GoogleMapTypeKeys, GoogleMapActions } from "./types";

export const initialState: IGoogleMapState = {
  googleObj: null,
  loading: false,
  error: null,
  // Initial Center Maps to this address 54640 County Road EE, Arapahoe, CO 80802
  latitude: 39.0149856,
  longitude: -102.1455916,
  bounds: null,
  currentZoomLevel: 5,
  predictiveSearchQuery: null,
  geocoderLocationType: null,
  streetViewPanoramaData: null,
  mapConfig: {
    zoom: 5,
    minZoom: 3,
    maxZoom: 21,
    center: {
      lat: 39.0149856,
      lng: -102.1455916
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: null,
      position: null
    },
    streetViewControl: false,
    streetViewControlOptions: {
      position: null
    },
    disableDefaultUI: true,
    zoomControl: true,
    zoomControlOptions: {
      position: null
    },
    draggableCursor: "pointer",
    styles: [
      {
        elementType: "labels",
        featureType: "transit",
        stylers: [
          {
            visibility: "on"
          }
        ]
      },
      {
        elementType: "labels",
        featureType: "poi",
        stylers: [
          {
            visibility: "on"
          }
        ]
      }
    ]
  },
  autocompletionRequest: null,
  autocompletePredictions: [],
  geocoderAddressType: null,
  polygonColor: "#4372B0"
};

export default (
  state = initialState,
  action: GoogleMapActions
): IGoogleMapState => {
  switch (action.type) {
    case GoogleMapTypeKeys.REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case GoogleMapTypeKeys.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case GoogleMapTypeKeys.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case GoogleMapTypeKeys.SET_PREDICTIVE_SEARCH_REQUEST:
      return {
        ...state,
        autocompletionRequest: action.request
      };
    case GoogleMapTypeKeys.SET_PREDICTIVE_SEARCH_RESPONSE:
      return {
        ...state,
        error: null,
        autocompletePredictions: action.searchResponse
      };
    case GoogleMapTypeKeys.SET_GOOGLE_OBJECT: {
      return {
        ...state,
        googleObj: action.googleObjResp
      };
    }
    case GoogleMapTypeKeys.SET_LAT_LNG: {
      return {
        ...state,
        latitude: action.coordinates.lat(),
        longitude: action.coordinates.lng()
      };
    }
    case GoogleMapTypeKeys.SET_STREETVIEW_PANORAMA_DATA: {
      return {
        ...state,
        streetViewPanoramaData: action.streetViewPanoramaData
      };
    }
    case GoogleMapTypeKeys.SET_BOUNDS: {
      return {
        ...state,
        bounds: action.viewport
      };
    }
    case GoogleMapTypeKeys.SET_CURRENT_ZOOM_LEVEL: {
      return {
        ...state,
        currentZoomLevel: action.zoom
      };
    }
    case GoogleMapTypeKeys.SET_PREDICTIVE_QUERY: {
      return {
        ...state,
        predictiveSearchQuery: action.query
      };
    }
    case GoogleMapTypeKeys.SET_GEOCODER_LOCATION_TYPE: {
      return {
        ...state,
        geocoderLocationType: action.locationType
      };
    }
    case GoogleMapTypeKeys.SET_GEOCODE_ADDRESS_TYPE: {
      return {
        ...state,
        geocoderAddressType: action.addressType
      };
    }
    case GoogleMapTypeKeys.SET_POLYGON_COLOR: {
      return {
        ...state,
        polygonColor: action.polygonColor
      };
    }
    default:
      return state;
  }
};
