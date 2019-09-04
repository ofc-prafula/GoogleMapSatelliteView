import { IParentDetails } from "../propertySearch/types";
import { AsyncAction } from "store";
import { IPropertySearchRequest } from "../propertySearch/types";
import {
  getPropertyDetails,
  setParentDetails
} from "../propertySearch/actions";
import { mapsServices } from "../../services/googleServiceAPI";
import {
  GoogleMapTypeKeys,
  IAutocompletePrediction,
  geocoderAddressTypes
} from "./types";

export function setGoogleObject(googleObj: any): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_GOOGLE_OBJECT,
      googleObjResp: googleObj
    });
  };
}

export function setPredictiveSearchRequest(
  autocompletionRequest: google.maps.places.AutocompletionRequest
): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_PREDICTIVE_SEARCH_REQUEST,
      request: autocompletionRequest
    });
  };
}

export function resetPredictiveSearchResponse(): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_PREDICTIVE_SEARCH_RESPONSE,
      searchResponse: []
    });
  };
}

export function setPredictiveSearchResponse(
  searchResponse: IAutocompletePrediction[]
) {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_PREDICTIVE_SEARCH_RESPONSE,
      searchResponse
    });
  };
}

export function setGeocoderLocationType(
  searchResponse: google.maps.GeocoderResult,
  isPropertyDetailsRequired: boolean
): AsyncAction<void> {
  return (dispatch, getState) => {
    dispatch({
      type: GoogleMapTypeKeys.SET_GEOCODER_LOCATION_TYPE,
      locationType: searchResponse.geometry.location_type
    });
    if (!isPropertyDetailsRequired) {
      const parentDetails: IParentDetails = {
        zoom: getState().googleMap.currentZoomLevel,
        lat: getState().googleMap.latitude,
        lng: getState().googleMap.longitude,
        bounds: getState().googleMap.bounds,
        address: getState().googleMap.predictiveSearchQuery
      };

      dispatch(setParentDetails(parentDetails));
    } else {
      dispatch(
        getPropertyDetails(createpropertyDetailsRequest(searchResponse))
      );
    }
    dispatch(setLatLng(searchResponse.geometry.location));
    dispatch(setBounds(searchResponse.geometry.viewport));
    dispatch(fetchDirectionServiceRoute(searchResponse.formatted_address));
    dispatch(setGeocodeAddressType(searchResponse.types[0]));
  };
}

export function setLatLng(coordinates: google.maps.LatLng): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_LAT_LNG,
      coordinates
    });
  };
}

export function fetchStreetViewPanoramaData(
  location: google.maps.LatLng
): AsyncAction<void> {
  return (dispatch, getState) => {
    return mapsServices
      .getStreetViewPanoramaData(getState().googleMap, location)
      .then((result: google.maps.StreetViewPanoramaData) => {
        dispatch({
          type: GoogleMapTypeKeys.SET_STREETVIEW_PANORAMA_DATA,
          streetViewPanoramaData: result
        });
      })
      .catch((errorMessage: string) => {
        const error = new Error(errorMessage);
        dispatch({
          type: GoogleMapTypeKeys.SET_STREETVIEW_PANORAMA_DATA,
          streetViewPanoramaData: null
        });
        dispatch({ type: GoogleMapTypeKeys.ERROR, error });
      });
  };
}

export function fetchDirectionServiceRoute(
  formattedAddress: string
): AsyncAction<void> {
  return (dispatch, getState) => {
    return mapsServices
      .getDirectionServiceRoute(getState().googleMap, formattedAddress)
      .then((result: google.maps.DirectionsResult) => {
        const location: google.maps.LatLng =
          result.routes[0].legs[0].start_location;
        dispatch(fetchStreetViewPanoramaData(location));
      })
      .catch((errorMessage: string) => {
        const error = new Error(errorMessage);
        dispatch({ type: GoogleMapTypeKeys.ERROR, error });
      });
  };
}

export function setBounds(
  viewport: google.maps.LatLngBounds
): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_BOUNDS,
      viewport
    });
  };
}

export function setCurrentZoomLevel(zoom: number): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_CURRENT_ZOOM_LEVEL,
      zoom
    });
  };
}

export function setPredictiveQuery(query: string): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_PREDICTIVE_QUERY,
      query
    });
  };
}

export function setPolygonColor(polygonColor: string): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_POLYGON_COLOR,
      polygonColor
    });
  };
}

export function createpropertyDetailsRequest(
  geocodeResponse: google.maps.GeocoderResult
): IPropertySearchRequest {
  const address_components: google.maps.GeocoderAddressComponent[] =
    geocodeResponse.address_components;
  const adminAreaLevel1: string = fnFindAddressLongName(
    geocoderAddressTypes.ADMINISTRATIVE_AREA_LEVEL_1,
    address_components
  );
  const county: string = fnFindAddressLongName(
    geocoderAddressTypes.ADMINISTRATIVE_AREA_LEVEL_2,
    address_components
  );
  const postalCode: string = fnFindAddressLongName(
    geocoderAddressTypes.POSTAL_CODE,
    address_components
  );
  const locality: string = fnFindAddressLongName(
    geocoderAddressTypes.LOCALITY,
    address_components
  );

  const arrFormattedAddress: string[] = geocodeResponse.formatted_address.split(
    ","
  );

  const propertyDetailsRequest: IPropertySearchRequest = {
    streetAddress: arrFormattedAddress[0],
    city: locality,
    state: adminAreaLevel1,
    county,
    zipCode: postalCode,
    types: geocodeResponse.types,
    locationType: geocodeResponse.geometry.location_type
  };

  return propertyDetailsRequest;
}

export function fnFindAddressLongName(
  geocoderAddressType: geocoderAddressTypes,
  addressComponents: google.maps.GeocoderAddressComponent[]
): string {
  const geocoderAddress = addressComponents.find(x =>
    x.types.includes(geocoderAddressType)
  );
  return geocoderAddress ? geocoderAddress.long_name.trim() : "";
}

export function setGeocodeAddressType(addressType: string): AsyncAction<void> {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_GEOCODE_ADDRESS_TYPE,
      addressType
    });
  };
}