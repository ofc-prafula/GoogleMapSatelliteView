import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import styles from "./styles";
import styled from "styled-components";
import PropertySearchStreetView from "../src/GoogleMapStreetView";
import "./styles.css";
import { fetchAndSetGeocoderResult } from "../src/store/googleMap/actions";
//import { Dispatch } from "../src/store/index";
import { Dispatch } from "redux";
import { store } from "../src/store/index";
import { connect } from "react-redux";
// import { ErrorBoundary } from "../ErrorBoundary";

interface IGoogleComponentTestProps {
  dispatch?: Dispatch;
}

class GoogleMapComponentTest extends React.Component<
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
              <PropertySearchStreetView />
            </ControlsContainer>
          </div>
        </React.Fragment>
      </Provider>
    );
  }

  //This is the call to action method which internally calls Google Javascript API
  private callGoogleAction = () => {
    // const { dispatch } = this.props;
    store.dispatch(
      fetchAndSetGeocoderResult(
        "906 North Kings Road, West Hollywood, CA, USA",
        true
      )
    );
    // );
  };
}

const ControlsContainer = styled.div`
  position: fixed;
  height: 500px;
  width: 700px;
`;

//function mapStateToProps(state) {
// function mapStateToProps(dispatch) {
//   return {
//     dispatch
//   };
// }

render(<GoogleMapComponentTest />, document.getElementById("root"));

export default connect()(GoogleMapComponentTest);
