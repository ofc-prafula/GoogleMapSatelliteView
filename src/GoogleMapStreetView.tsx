import { Fragment } from "react";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { IApplicationState } from "store";
import styled from "styled-components";

export interface IPropertySearchStreetViewProps {
  googleObj: any;
  lat: number;
  lng: number;
  streetViewPanoramaData: google.maps.StreetViewPanoramaData;
  loading: boolean;
}

interface IPropertySearchStreetViewState {
  mounted: boolean;
}

class PropertySearchStreetView extends React.Component<
  IPropertySearchStreetViewProps,
  IPropertySearchStreetViewState
> {
  public streetViewRef: HTMLElement;
  public streetViewSatelliteRef: HTMLElement;

  constructor(props) {
    super(props);
    this.streetViewRef = null;
    this.streetViewSatelliteRef = null;
    this.state = {
      mounted: false
    };
  }

  public componentDidMount() {
    this.setState({
      mounted: true
    });
  }

  public componentDidUpdate() {
    if (this.props.loading === false) {
      this.initialize();
    }
  }

  public render() {
    const { streetViewPanoramaData } = this.props;

    return (
      <Fragment>
        {this.state.mounted && streetViewPanoramaData && (
          <StreetView
            id="streetviewdiv"
            ref={node => (this.streetViewRef = node)}
          />
        )}
        {this.state.mounted && !streetViewPanoramaData && (
          <StreetViewSatellite
            id="streetviewsatellitediv"
            ref={node => (this.streetViewSatelliteRef = node)}
          />
        )}
      </Fragment>
    );
  }

  private initialize() {
    const { googleObj, lat, lng, streetViewPanoramaData } = this.props;
    const positionCenter = new googleObj.maps.LatLng(lat, lng);

    if (streetViewPanoramaData) {
      if (this.streetViewRef != null) {
        const panoID = streetViewPanoramaData.location.pano;
        const carPoint = streetViewPanoramaData.location.latLng;
        const heading = googleObj.maps.geometry.spherical.computeHeading(
          carPoint,
          positionCenter
        );
        const streetViewPanorama = new googleObj.maps.StreetViewPanorama(
          ReactDOM.findDOMNode(this.streetViewRef) as HTMLElement,
          {
            position: positionCenter,
            pov: { heading, pitch: 0 },
            addressControl: false,
            panControlOptions: {
              position: googleObj.maps.ControlPosition.RIGHT_TOP
            },
            zoomControlOptions: {
              position: googleObj.maps.ControlPosition.TOP_LEFT
            },
            fullscreenControlOptions: {
              position: googleObj.maps.ControlPosition.TOP_RIGHT
            }
          }
        );
        streetViewPanorama.setPano(panoID);
      }
    } else {
      if (this.streetViewSatelliteRef != null) {
        const streetViewSatellite = new googleObj.maps.Map(
          ReactDOM.findDOMNode(this.streetViewSatelliteRef) as HTMLElement,
          {
            zoom: 19,
            center: positionCenter,
            disableDefaultUI: true,
            zoomControl: false,
            mapTypeId: googleObj.maps.MapTypeId.SATELLITE
          }
        );
        streetViewSatellite.setTilt(0);
      }
    }
  }
}

function mapStateToProps(state: IApplicationState) {
  const {
    googleObj,
    latitude,
    longitude,
    streetViewPanoramaData
  } = state.googleMap;

  return {
    googleObj,
    lat: latitude,
    lng: longitude,
    streetViewPanoramaData,
    loading: state.propertySearch.loading
  };
}

export default connect(mapStateToProps)(PropertySearchStreetView);

export const StreetView = styled.div`
  height: 100%;
`;
export const StreetViewSatellite = styled.div`
  height: 100%;
`;
StreetViewSatellite.displayName = "StreetViewSatellite";
