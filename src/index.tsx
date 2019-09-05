import * as React from "react";
import { render } from "react-dom";
import styles from "./styles";
import styled from "styled-components";
import PropertySearchStreetView from "../src/GoogleMapStreetView";
import "./styles.css";
import { fetchAndSetGeocoderResult } from "../src/store/googleMap/actions";
import { Dispatch } from "../src/store/index";
// import { connect } from "react-redux";

interface IGoogleComponentTestProps {
  dispatch: Dispatch;
}

export default class GoogleComponentTest extends React.Component<
  IGoogleComponentTestProps
> {
  public render() {
    return (
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
            <PropertySearchStreetView />
          </ControlsContainer>
        </div>
      </React.Fragment>
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

render(<GoogleComponentTest />, document.getElementById("root"));
//export default connect(mapStateToProps);
