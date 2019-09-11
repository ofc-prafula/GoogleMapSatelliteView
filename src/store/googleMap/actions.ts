import { AsyncAction } from "../index";
import { IPropertySearchRequest } from "../propertySearch/types";
import { mapsServices } from "../../services/googleServiceAPI";
import { GoogleMapTypeKeys, geocoderAddressTypes } from "./types";

export function setGoogleObject(googleObj: any) {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_GOOGLE_OBJECT,
      googleObjResp: googleObj
    });
  };
}

export function fetchReverseGeocoderResult(
  latlng: google.maps.LatLng
): AsyncAction<void> {
  return (dispatch, getState) => {
    return mapsServices
      .getReverseGeocoderResult(getState().googleMap, latlng)
      .then((searchResponse: google.maps.GeocoderResult[]) => {
        const { formatted_address } = searchResponse[0];
        dispatch(setPredictiveQuery(formatted_address));
        dispatch(fetchAndSetGeocoderResult(formatted_address, true));
      })
      .catch((errorMessage: string) => {
        const error = new Error(errorMessage);
        dispatch({ type: GoogleMapTypeKeys.ERROR, error });
      });
  };
}

export function fetchAndSetGeocoderResult(
  address: string,
  isPropertyDetailsRequired: boolean
): AsyncAction<void> {
  return (dispatch, getState) => {
    return mapsServices
      .getGeocoderResult(getState().googleMap, address)
      .then((searchResponse: google.maps.GeocoderResult[]) => {
        dispatch(
          setGeocoderLocationType(searchResponse[0], isPropertyDetailsRequired)
        );
      })
      .catch((errorMessage: string) => {
        const error = new Error(errorMessage);
        dispatch({ type: GoogleMapTypeKeys.ERROR, error });
      });
  };
}

export function setGeocoderLocationType(
  searchResponse: google.maps.GeocoderResult,
  isPropertyDetailsRequired: boolean
) {
  return dispatch => {
    dispatch(fetchDirectionServiceRoute(searchResponse.formatted_address));
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

export function setPredictiveQuery(query: string) {
  return dispatch => {
    dispatch({
      type: GoogleMapTypeKeys.SET_PREDICTIVE_QUERY,
      query
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
