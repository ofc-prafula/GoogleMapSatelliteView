import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import styles from "./styles";
import styled from "styled-components";
import PropertySearchStreetView from "../src/GoogleMapStreetView";
import "./styles.css";
import { fetchAndSetGeocoderResult } from "../src/store/googleMap/actions";
import { Dispatch } from "../src/store/index";
import { store } from "../src/store/index";
// import { ErrorBoundary } from "../ErrorBoundary";

interface IGoogleComponentTestProps {
  dispatch?: Dispatch;
}

export default class GoogleMapComponent extends React.Component<
  IGoogleComponentTestProps
> {
  public render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <div className="App">
            <h1>Google Street View Sample</h1>
            <button
              type="button"
              style={styles.button}
              onClick={() => this.callGoogleAction()}
            >
              Google Street View
            </button>
            <ControlsContainer>
              {/* ----------------------------------------------------------------------------------We
              are getting an error here while calling PropertySearchStreetView
              Component--------- 
              Possible reason as suggested by Arturo could
              be that the component is being rendered/instantiate before we call
              this---------------------------------------------------------------------------------- */}
              {/* <PropertySearchStreetView /> */}
            </ControlsContainer>
          </div>
        </React.Fragment>
      </Provider>
    );
  }

  private callGoogleAction = () => {
    const { dispatch } = this.props;
    dispatch(
      fetchAndSetGeocoderResult(
        "906 North Kings Road, West Hollywood, CA, USA",
        true
      )
    );
  };
}

const ControlsContainer = styled.div`
  position: fixed;
  height: 500px;
  width: 700px;
`;

render(<GoogleMapComponent />, document.getElementById("root"));
