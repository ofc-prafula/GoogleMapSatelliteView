import { IGoogleMapState } from "../store/googleMap/types";
export const mapsServices = {
  getDirectionServiceRoute,
  getStreetViewPanoramaData
};

function getDirectionServiceRoute(
  googleMap: IGoogleMapState,
  formattedAddress: string
) {
  return new Promise((resolve, reject) => {
    const { googleObj } = googleMap;
    const service = new googleObj.maps.DirectionsService();
    const directionsRequest: google.maps.DirectionsRequest = {
      origin: formattedAddress ? formattedAddress : "",
      destination: formattedAddress ? formattedAddress : "",
      travelMode: googleObj.maps.DirectionsTravelMode.DRIVING
    };
    const error =
      "Google DirectionsService API has returned error with error code";
    service.route(
      directionsRequest,
      (result: google.maps.DirectionsResult, status: string) =>
        status === "OK" ? resolve(result) : reject(error)
    );
  });
}

function getStreetViewPanoramaData(
  googleMap: IGoogleMapState,
  location: google.maps.LatLng
) {
  return new Promise((resolve, reject) => {
    const { googleObj } = googleMap;
    const service = new googleObj.maps.StreetViewService();
    const panoramaSource = googleObj.maps.StreetViewSource.OUTDOOR;
    const panoramaPreference = googleObj.maps.StreetViewPreference.NEAREST;
    const streetViewLocationRequest: google.maps.StreetViewLocationRequest = {
      location,
      preference: panoramaPreference,
      source: panoramaSource,
      radius: 50
    };
    const error = "Google StreetViewService API has not returned any data";
    service.getPanorama(
      streetViewLocationRequest,
      (result: google.maps.StreetViewPanoramaData, status: string) =>
        status === "OK" ? resolve(result) : reject(error)
    );
  });
}
