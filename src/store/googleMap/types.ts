export enum GoogleMapTypeKeys {
  ENTITY = "[googleMap]",
  // Generic actions used to update current request state
  REQUEST = "googleMap/REQUEST",
  SUCCESS = "googleMap/SUCCESS",
  ERROR = "googleMap/ERROR",
  // Store different types of data received via sXHR
  SET_PREDICTIVE_SEARCH_REQUEST = "googlemap/SET_PREDICTIVE_SEARCH_REQUEST",
  SET_PREDICTIVE_SEARCH_RESPONSE = "googlemap/SET_PREDICTIVE_SEARCH_RESPONSE",
  SET_GOOGLE_OBJECT = "googlemap/SET_GOOGLE_OBJECT",
  SET_LAT_LNG = "googlemap/SET_CENTER",
  SET_BOUNDS = "googlemap/SET_BOUNDS",
  SET_STREETVIEW_PANORAMA_DATA = "googlemap/SET_STREETVIEW_PANORAMA_DATA",
  SET_CURRENT_ZOOM_LEVEL = "googlemap/SET_CURRENT_ZOOM_LEVEL",
  SET_PREDICTIVE_QUERY = "googlemap/SET_PREDICTIVE_QUERY",
  SET_GEOCODER_LOCATION_TYPE = "googlemap/SET_GEOCODER_LOCATION_TYPE",
  SET_GEOCODE_ADDRESS_TYPE = "googlemap/SET_GEOCODE_ADDRESS_TYPE",
  SET_POLYGON_COLOR = "googlemap/SET_POLYGON_COLOR"
}

export interface IGoogleMapState {
  loading: boolean;
  error: string | null;
  mapConfig: google.maps.MapOptions;
  bounds: any;
  currentZoomLevel: any;
  predictiveSearchQuery: string;
  geocoderLocationType: string;
  latitude: number;
  longitude: number;
  streetViewPanoramaData: google.maps.StreetViewPanoramaData;
  autocompletionRequest: google.maps.places.AutocompletionRequest;
  autocompletePredictions: IAutocompletePrediction[];
  googleObj: any;
  geocoderAddressType: string;
  polygonColor: string;
}

export interface IAutocompletePrediction
  extends google.maps.places.AutocompletePrediction {
  id: string;
}

export type GoogleMapActions =
  | IGoogleMapSuccessAction
  | IGoogleMapErrorAction
  | IGoogleMapPredictiveSearchRequest
  | IGoogleMapPredictiveSearchRespose
  | IGoogleMapSetGoogleObject
  | IGoogleMapRequest
  | IGoogleMapSetLatLng
  | IGoogleMapSetStreetViewPanoramaData
  | IGoogleMapSetBounds
  | IGoogleMapSetCurrentZoomLevel
  | IGoogleMapSetPredictiveQuery
  | IGoogleMapSetGeocoderLocationType
  | IGoogleMapSetGeocodeAddressTypes
  | IGoogleMapsSetPolygonColor;

export interface IGoogleMapSuccessAction {
  type: GoogleMapTypeKeys.SUCCESS;
}

export interface IGoogleMapErrorAction {
  type: GoogleMapTypeKeys.ERROR;
  error: string;
}

export interface IGoogleMapPredictiveSearchRequest {
  type: GoogleMapTypeKeys.SET_PREDICTIVE_SEARCH_REQUEST;
  request: google.maps.places.AutocompletionRequest;
}

export interface IGoogleMapPredictiveSearchRespose {
  type: GoogleMapTypeKeys.SET_PREDICTIVE_SEARCH_RESPONSE;
  searchResponse: IAutocompletePrediction[];
}

export interface IGoogleMapSetGoogleObject {
  type: GoogleMapTypeKeys.SET_GOOGLE_OBJECT;
  googleObjResp: any;
}

export interface IGoogleMapRequest {
  type: GoogleMapTypeKeys.REQUEST;
}

export interface IGoogleMapSetLatLng {
  type: GoogleMapTypeKeys.SET_LAT_LNG;
  coordinates: google.maps.LatLng;
}

export interface IGoogleMapSetStreetViewPanoramaData {
  type: GoogleMapTypeKeys.SET_STREETVIEW_PANORAMA_DATA;
  streetViewPanoramaData: google.maps.StreetViewPanoramaData;
}

export interface IGoogleMapSetBounds {
  type: GoogleMapTypeKeys.SET_BOUNDS;
  viewport: any;
}

export interface IGoogleMapSetCurrentZoomLevel {
  type: GoogleMapTypeKeys.SET_CURRENT_ZOOM_LEVEL;
  zoom: number;
}

export interface IGoogleMapSetPredictiveQuery {
  type: GoogleMapTypeKeys.SET_PREDICTIVE_QUERY;
  query: string;
}

export interface IGoogleMapSetGeocoderLocationType {
  type: GoogleMapTypeKeys.SET_GEOCODER_LOCATION_TYPE;
  locationType: string;
}

export interface IGoogleMapSetGeocodeAddressTypes {
  type: GoogleMapTypeKeys.SET_GEOCODE_ADDRESS_TYPE;
  addressType: string;
}

export interface IGoogleMapsSetPolygonColor {
  type: GoogleMapTypeKeys.SET_POLYGON_COLOR;
  polygonColor: string;
}

export enum geocoderAddressTypes {
  STREET_NUMBER = "street_number",
  ROUTE = "route",
  NEIGHBORHOOD = "neighborhood",
  LOCALITY = "locality",
  ADMINISTRATIVE_AREA_LEVEL_2 = "administrative_area_level_2",
  ADMINISTRATIVE_AREA_LEVEL_1 = "administrative_area_level_1",
  COUNTRY = "country",
  POSTAL_CODE = "postal_code",
  INTERSECTION = "intersection",
  STREET_ADDRESS = "street_address"
}
