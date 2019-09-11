import React from "react";
import ReactDOM from "react-dom";
import GoogleApiComponent from "./GoogleApiComponent";
import { IApplicationState, store } from "store";
import { connect } from "react-redux";
import debounce from "lodash.debounce";
import {
  setCurrentZoomLevel,
  fetchReverseGeocoderResult,
  setPolygonColor
} from "store/googleMap/actions";
import { geocoderAddressTypes } from "store/googleMap/types";
import "./index.css";
import { IPropertyDetails } from "store/propertySearch/types";
import { getConcatenatedPropertyAddress } from "utils/address";
import {
  white,
  blue,
  footerHeight,
  headerHeight,
  footerPadding,
  shadow2,
  solidYellow,
  lightBlue,
  pencilIcon
} from "config/theme";
import { setSelectedPropertyDetail } from "store/propertySearch/actions";
import { PropertySearchFeatures } from "components/Features";
import { isFeatureEnabled } from "store/features/helpers";

export interface IGoogleMapComponentProps {
  google: any;
  lat: number;
  lng: number;
  mapConfig: google.maps.MapOptions;
  bounds: google.maps.LatLngBounds;
  geocoderLocationType: string;
  geocoderAddressType: string;
  predictiveSearchQuery: string;
  selectedPropertyDetail: IPropertyDetails;
  polygonColor: string;
  canAccessFarming: boolean;
}

export class GoogleMapComponent extends React.Component<
  IGoogleMapComponentProps
> {
  public toggleDiv: HTMLElement = null;
  public freeHandDrawDiv: HTMLElement = null;
  public mapRef: HTMLElement = null;
  public map: google.maps.Map;
  private debounceTime: number = 500;
  private markers: google.maps.Marker[] = [];
  private isFreeHandActive: boolean = false;
  constructor(props) {
    super(props);
    this.toggleDiv = document.createElement("div");
    this.freeHandDrawDiv = document.createElement("div");
    this.mapRef = null;
  }

  public componentDidUpdate(prevProps: IGoogleMapComponentProps) {
    if (
      prevProps.mapConfig !== this.props.mapConfig ||
      prevProps.google !== this.props.google ||
      prevProps.canAccessFarming !== this.props.canAccessFarming
    ) {
      this.initializeMap(
        prevProps.canAccessFarming !== this.props.canAccessFarming
      );
      this.forceUpdate();
    }
  }

  public render() {
    this.handleMapUpdates();
    const mapHeight = footerHeight + headerHeight + footerPadding + "px";
    const mapStyle = {
      width: "100vw",
      height: `calc(100vh - ${mapHeight})`
    };
    return <div style={mapStyle} ref={node => (this.mapRef = node)} />;
  }

  private initializeMap(farmingFeatureToggled: boolean) {
    const { canAccessFarming } = this.props;
    if (this.props.google) {
      const { google, mapConfig, lat, lng } = this.props;
      const maps = google.maps;
      const mapReference = this.mapRef;
      const node = ReactDOM.findDOMNode(mapReference) as HTMLElement;
      const center: google.maps.LatLng = new maps.LatLng(lat, lng);

      mapConfig.center = center;
      mapConfig.streetViewControlOptions.position =
        google.maps.ControlPosition.TOP_RIGHT;
      mapConfig.zoomControlOptions.position =
        google.maps.ControlPosition.TOP_RIGHT;
      mapConfig.mapTypeControlOptions.style =
        google.maps.MapTypeControlStyle.DEFAULT;
      mapConfig.mapTypeControlOptions.position =
        google.maps.ControlPosition.RIGHT_BOTTOM;
      this.map = new maps.Map(node, mapConfig);

      if (!farmingFeatureToggled) {
        const controlUI = document.createElement("div");
        controlUI.style.backgroundColor = `${white}`;
        controlUI.id = "property_search__2D_3D_toggle";
        controlUI.style.cursor = "pointer";
        controlUI.style.borderRadius = "3px";
        controlUI.style.border = "1px solid transparent";
        controlUI.style.display = "flex";
        controlUI.style.justifyContent = "center";
        controlUI.style.padding = "6px";
        controlUI.style.margin = "10px 10px 20px 10px";
        controlUI.style.height = "35px";
        controlUI.style.width = "40px";
        controlUI.style.boxShadow = `${shadow2}`;
        this.toggleDiv.appendChild(controlUI);

        const controlText = document.createElement("div");
        controlText.innerHTML = "3D";
        controlText.style.fontSize = "18px";
        controlText.style.fontWeight = "500";
        controlText.style.color = `${blue}`;
        controlUI.appendChild(controlText);
        this.map.setTilt(0);
        controlUI.addEventListener("click", () => {
          if (controlText.innerHTML === "3D") {
            this.map.setTilt(45);
            controlText.innerHTML = "2D";
          } else {
            this.map.setTilt(0);
            controlText.innerHTML = "3D";
          }
        });
      }
      this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        this.toggleDiv
      );
      this.initializePencilIcon();
      this.handleMapEventListeners();
    }
  }

  private initializePencilIcon() {
    const { canAccessFarming } = this.props;
    if (canAccessFarming) {
      const freeHandUI = document.createElement("div");
      freeHandUI.style.backgroundColor = `${white}`;
      freeHandUI.id = "property_search_free_hand_draw";
      freeHandUI.style.cursor = "pointer";
      freeHandUI.style.borderRadius = "3px";
      freeHandUI.style.border = "1px solid transparent";
      freeHandUI.style.display = "flex";
      freeHandUI.style.justifyContent = "center";
      freeHandUI.style.padding = "7px 6px 6px 10px";
      freeHandUI.style.margin = "10px 10px 20px 10px";
      freeHandUI.style.height = "35px";
      freeHandUI.style.width = "40px";
      freeHandUI.addEventListener("click", () => {
        this.isFreeHandActive = true;
      });
      freeHandUI.style.boxShadow = `${shadow2}`;
      freeHandUI.innerHTML = pencilIcon;
      this.freeHandDrawDiv.appendChild(freeHandUI);
      this.map.controls[google.maps.ControlPosition.RIGHT_TOP].push(
        this.freeHandDrawDiv
      );
    }
  }

  private drawFreeHand() {
    // initialize polygon
    let poly: any;
    const polylnglat: string[] = [];
    poly = new google.maps.Polygon({
      map: this.map,
      clickable: false,
      strokeColor: this.props.polygonColor,
      strokeWeight: 2,
      fillOpacity: 0.15,
      zIndex: 1,
      editable: false,
      fillColor: this.props.polygonColor
    });

    // move-listener
    const move = google.maps.event.addListener(this.map, "mousemove", e => {
      poly.getPath().push(e.latLng);
      polylnglat.push(e.latLng.lng() + " " + e.latLng.lat());
    });

    // mouseup-listener
    google.maps.event.addListenerOnce(this.map, "mouseup", () => {
      google.maps.event.removeListener(move);
      const path = poly.getPath();
      poly.setMap(null);

      poly = new google.maps.Polygon({
        map: this.map,
        paths: path,
        strokeColor: this.props.polygonColor,
        strokeWeight: 2,
        fillColor: this.props.polygonColor
      });

      // Send polylnglat.toString() to DT request object
      google.maps.event.clearListeners(this.map.getDiv(), "mousedown");
      this.enable();
    });
  }

  private disable() {
    this.map.setOptions({
      draggable: false,
      zoomControl: false,
      scrollwheel: false,
      disableDoubleClickZoom: false
    });
    this.isFreeHandActive = false;
  }

  private enable() {
    this.map.setOptions({
      draggable: true,
      zoomControl: true,
      scrollwheel: true,
      disableDoubleClickZoom: true
    });
  }

  private handleMapEventListeners() {
    google.maps.event.addListener(
      this.map,
      "zoom_changed",
      debounce(() => {
        store.dispatch(setCurrentZoomLevel(this.map.getZoom()));
      }, this.debounceTime)
    );

    google.maps.event.addListener(this.map, "mousedown", () => {
      if (this.isFreeHandActive) {
        this.disable();
        this.drawFreeHand();
      }
    });

    google.maps.event.addListener(this.map, "click", event => {
      if (this.map.getZoom() > 12) {
        store.dispatch(
          fetchReverseGeocoderResult(
            new google.maps.LatLng(event.latLng.lat(), event.latLng.lng())
          )
        );
        store.dispatch(setSelectedPropertyDetail(null));
      }
    });

    google.maps.event.addListener(this.map, "maptypeid_changed", () => {
      if (
        this.map.getMapTypeId() === google.maps.MapTypeId.SATELLITE ||
        this.map.getMapTypeId() === google.maps.MapTypeId.HYBRID
      ) {
        store.dispatch(setPolygonColor(`${solidYellow}`));
      } else if (
        this.map.getMapTypeId() === google.maps.MapTypeId.ROADMAP ||
        this.map.getMapTypeId() === google.maps.MapTypeId.TERRAIN
      ) {
        store.dispatch(setPolygonColor(`${lightBlue}`));
      }
    });
  }

  private showMarkers() {
    for (const marker of this.markers) {
      marker.setMap(this.map);
    }
  }

  private removeMarkers() {
    for (const marker of this.markers) {
      marker.setMap(null);
    }
    this.markers = [];
  }

  private handleMapUpdates() {
    const {
      google,
      lat,
      lng,
      bounds,
      geocoderLocationType,
      geocoderAddressType,
      predictiveSearchQuery,
      selectedPropertyDetail
    } = this.props;

    if (this.map) {
      const center: google.maps.LatLng = new google.maps.LatLng(lat, lng);
      this.map.setCenter(center);
      if (bounds) {
        this.map.fitBounds(bounds);
        this.removeMarkers();
        if (geocoderLocationType !== "APPROXIMATE") {
          const marker: google.maps.Marker = new google.maps.Marker({
            position: center
          });
          const infoWindow: google.maps.InfoWindow = new google.maps.InfoWindow(
            {
              content: this.infoWindowContent(
                selectedPropertyDetail,
                geocoderAddressType,
                predictiveSearchQuery
              ),
              maxWidth: "361px"
            }
          );
          marker.addListener(
            "click",
            debounce(() => {
              infoWindow.open(this.map, marker);
            }, this.debounceTime)
          );

          infoWindow.open(this.map, marker);
          this.markers.push(marker);
          this.showMarkers();
        }
      }
    }
  }

  private infoWindowContent = (
    selectedPropertyDetail: IPropertyDetails,
    geocoderAddressType: string,
    predictiveSearchQuery: string
  ) => {
    let formattedAddress = "";
    if (selectedPropertyDetail) {
      formattedAddress = getConcatenatedPropertyAddress(
        selectedPropertyDetail
      ).replace(" |", ",");
    } else {
      formattedAddress = predictiveSearchQuery;
    }
    return `<div class="custom-info-bubble"><span class="custom-info-window-address">${formattedAddress}</span></br><span class="custom-info-window-address-type">${showAddressType(
      geocoderAddressType
    )}</span></div>`;
  };
}

export const showAddressType = geocoderAddressType => {
  let geocodeAddressTypeText = "";
  switch (geocoderAddressType) {
    case geocoderAddressTypes.ROUTE: {
      geocodeAddressTypeText = "Street - Estimated";
      break;
    }
    case geocoderAddressTypes.STREET_ADDRESS: {
      geocodeAddressTypeText = "Street Address - Estimated";
      break;
    }
    case geocoderAddressTypes.INTERSECTION: {
      geocodeAddressTypeText = "Intersection - Estimated";
      break;
    }
    default: {
      geocodeAddressTypeText = "";
      break;
    }
  }
  return geocodeAddressTypeText;
};

function mapStateToProps(state: IApplicationState) {
  const canAccessFarming = isFeatureEnabled(
    state,
    PropertySearchFeatures.Farming
  );
  const {
    googleObj,
    mapConfig,
    latitude,
    longitude,
    bounds,
    geocoderLocationType,
    geocoderAddressType,
    predictiveSearchQuery,
    polygonColor
  } = state.googleMap;

  return {
    google: googleObj,
    mapConfig,
    lat: latitude,
    lng: longitude,
    bounds,
    geocoderLocationType,
    geocoderAddressType,
    predictiveSearchQuery,
    selectedPropertyDetail: state.propertySearch.selectedPropertyDetail,
    polygonColor,
    canAccessFarming
  };
}

export default connect(mapStateToProps)(
  GoogleApiComponent({
    apiKey: AppConfig.googleMapApiKey
  })(GoogleMapComponent)
);
