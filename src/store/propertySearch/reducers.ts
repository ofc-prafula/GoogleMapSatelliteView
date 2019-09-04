import {
  IPropertySearchState,
  PropertySearchTypeKeys,
  PropertySearchActions
} from "./types";

const parentDetails = {
  zoom: null,
  lat: null,
  lng: null,
  bounds: null,
  address: ""
};

export const pagination = {
  limit: 10,
  page: 1,
  total: 0,
  pages: 0
};

export const initialState: IPropertySearchState = {
  loading: false,
  error: null,
  propertyDetails: null,
  propertyDocuments: [],
  selectedPropertyDetail: null,
  parentDetails,
  pagination,
  propertyDocumentData: null
};

export default (
  state = initialState,
  action: PropertySearchActions
): IPropertySearchState => {
  switch (action.type) {
    case PropertySearchTypeKeys.REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case PropertySearchTypeKeys.SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case PropertySearchTypeKeys.ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case PropertySearchTypeKeys.SET_PROPERTY_DETAILS:
      return {
        ...state,
        propertyDetails: action.details
      };
    case PropertySearchTypeKeys.SET_SELECTED_PROPERTY_DETAIL:
      return {
        ...state,
        selectedPropertyDetail: action.selectedPropertyDetail
      };
    case PropertySearchTypeKeys.SET_PARENT_DETAILS:
      return {
        ...state,
        parentDetails: action.parentDetails
      };
    case PropertySearchTypeKeys.GET_PROPERTY_DOCUMENTS:
    case PropertySearchTypeKeys.SET_PROPERTY_DOCUMENTS:
      return {
        ...state,
        propertyDocuments: action.documents || []
      };
    case PropertySearchTypeKeys.SET_PROPERTY_PAGINATION:
      return {
        ...state,
        pagination: action.paginationDetails
      };
    case PropertySearchTypeKeys.GET_PROPERTY_DOCUMENTS_DATA:
      return {
        ...state,
        propertyDocumentData: action.propertyDocumentData
      };
    default:
      return state;
  }
};
