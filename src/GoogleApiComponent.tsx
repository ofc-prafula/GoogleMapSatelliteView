import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import cache from "../src/scriptCache";
import GoogleApi from "./GoogleApi";
import { setGoogleObject } from "../src/store/googleMap/actions";
import { store } from "../src/store/index";
import { IGoogleMapComponentProps } from "./GoogleMapComponent";

interface IwrapperProps {
  apiKey: string;
}

export const wrapper = ({ apiKey }: IwrapperProps) => (
  WrappedComponent: React.ComponentClass<IGoogleMapComponentProps>
) => {
  const libraries = ["places", "geometry"];

  class Wrapper extends React.Component<IGoogleMapComponentProps> {
    public scriptCache: any;
    public map: google.maps.Map;
    public mapRef: HTMLElement = null;

    public constructor(props: IGoogleMapComponentProps) {
      super(props);
      this.mapRef = null;
    }

    public componentDidMount() {
      this.scriptCache = cache({
        google: GoogleApi({
          apiKey,
          libraries
        })
      });

      this.scriptCache.google.onLoad(() => {
        store.dispatch(setGoogleObject((window as any).google));

        const maps = (window as any).google.maps;
        const mapRef = this.mapRef;
        const node = ReactDOM.findDOMNode(mapRef) as HTMLElement;
        const mapConfig = {};

        this.map = new maps.Map(node, mapConfig);
      });
    }

    public render() {
      return (
        <Fragment>
          <WrappedComponent {...this.props} />
          <div ref={node => (this.mapRef = node)} />
        </Fragment>
      );
    }
  }

  return Wrapper;
};

export default wrapper;
