import { AsyncAction } from "../index";
// import workspaceAPI, { downloadDocAPI } from "../../services/workspaceAPI";
import {
  PropertySearchTypeKeys,
  IPropertySearchRequest,
  IPropertyDetailsResponse,
  IPropertyDetails,
  IParentDetails
} from "./types";
// import { showNotification } from "store/notifications/actions";
// import notificationTheme from "components/Tile/themes";
// import { pagination } from "./reducers";
// import {
//   updatePropertyDocumentsUsage,
//   getCombinedReportOptions,
//   filterPropertyDocuments
// } from "./helper";
// import { toLower } from "utils/objects";

// export function getPropertyDetails(
//   propertySearchRequest: IPropertySearchRequest
// ): AsyncAction<void> {
//   return dispatch => {
//     dispatch({ type: PropertySearchTypeKeys.REQUEST });
//     return workspaceAPI
//       .post("/properties", propertySearchRequest)
//       .then(({ data }) => {
//         let response: IPropertyDetailsResponse;
//         dispatch({ type: PropertySearchTypeKeys.SUCCESS });
//         if (data) {
//           response = data;
//         } else {
//           response = {
//             maxResultsCount: 0,
//             referenceId: 0,
//             orderItemId: 0,
//             litePropertyList: []
//           };
//         }
//         dispatch(setPropertyDetails(response));
//         if (response.litePropertyList.length === 1) {
//           const { state, apn, zipCode } = response.litePropertyList[0];
//           dispatch(getPropertyDocuments(state, apn, zipCode));
//         } else {
//           const resultCount = response.litePropertyList.length;
//           dispatch(
//             setPropertyPagination({
//               page: 1,
//               limit: pagination.limit,
//               pages: Math.ceil(resultCount / pagination.limit),
//               total: resultCount
//             })
//           );
//         }
//       })
//       .catch(error => {
//         dispatch({
//           type: PropertySearchTypeKeys.ERROR,
//           error
//         });
//       });
//   };
// }

// export function setPropertyDetails(
//   propertyDetails: IPropertyDetailsResponse
// ): AsyncAction<void> {
//   return dispatch => {
//     dispatch({
//       type: PropertySearchTypeKeys.SET_PROPERTY_DETAILS,
//       details: propertyDetails
//     });
//   };
// }

// export function setSelectedPropertyDetail(
//   selectedPropertyDetail: IPropertyDetails
// ): AsyncAction<void> {
//   return dispatch => {
//     dispatch({
//       type: PropertySearchTypeKeys.SET_SELECTED_PROPERTY_DETAIL,
//       selectedPropertyDetail
//     });
//   };
// }

// export function setParentDetails(
//   parentDetails: IParentDetails
// ): AsyncAction<void> {
//   return dispatch => {
//     dispatch({
//       type: PropertySearchTypeKeys.SET_PARENT_DETAILS,
//       parentDetails
//     });
//   };
// }
