import { PropertyDocument } from "./constants";

export enum PropertySearchTypeKeys {
  ENTITY = "[propertySearch]",
  // Generic actions used to update current request state
  REQUEST = "propertySearch/REQUEST",
  SUCCESS = "propertySearch/SUCCESS",
  ERROR = "propertySearch/ERROR",
  // Store different types of data received via XHR
  SET_PROPERTY_DETAILS = "propertySearch/SET_PROPERTY_DETAILS",
  SET_SELECTED_PROPERTY_DETAIL = "propertySearch/SET_SELECTED_PROPERTY_DETAIL",
  SET_PARENT_DETAILS = "propertySearch/SET_PARENT_DETAILS",
  GET_PROPERTY_DOCUMENTS = "propertySearch/documents/GET_PROPERTY_DOCUMENTS",
  SET_PROPERTY_DOCUMENTS = "propertySearch/documents/SET_PROPERTY_DOCUMENTS",
  RECEIVE_PROPERTY_DOCUMENT_DOWNLOAD_RESULT = "propertysearch/RECEIVE_PROPERTY_DOCUMENT_DOWNLOAD_RESULT",
  SET_PROPERTY_PAGINATION = "propertySearch/SET_PROPERTY_PAGINATION",
  GET_PROPERTY_DOCUMENTS_DATA = "propertySearch/documents/GET_PROPERTY_DOCUMENTS_DATA"
}

// Import this object to statically use combined report in documents section
export const combinedReport: IPropertyDocument = {
  id: PropertyDocument.Combined,
  propertyProductName: "Combined Report",
  isCombinedReport: true,
  productPrice: null,
  isPriceApplicable: false,
  monthlyAllowanceThreshold: 0,
  propertyProductUsageDetail: {
    monthToDateUsage: 0,
    isCached: false,
    productId: 0
  }
};

export interface IPropertySearchState {
  loading: boolean;
  error: Error | null;
  propertyDetails: IPropertyDetailsResponse;
  selectedPropertyDetail: IPropertyDetails;
  parentDetails: IParentDetails;
  propertyDocuments: IPropertyDocument[];
  pagination: IPagination;
  propertyDocumentData: IPropertyDocumentData;
}

export type PropertySearchActions =
  | IPropertySearchSuccessAction
  | IPropertySearchErrorAction
  | IPropertySearchRequestAction
  | IPropertySearchSetPropertyDetails
  | IPropertySearchSetSelectedPropertyDetail
  | IPropertySearchSetParentDetails
  | IPropertyDocumentsAction
  | IPropertyPagination
  | IPropertyDocumentsDataAction;

export interface IPropertySearchSuccessAction {
  type: PropertySearchTypeKeys.SUCCESS;
}

export interface IPropertySearchErrorAction {
  type: PropertySearchTypeKeys.ERROR;
  error: Error;
}

export interface IPropertySearchRequestAction {
  type: PropertySearchTypeKeys.REQUEST;
}

export interface IPropertyDocumentsAction {
  type:
    | PropertySearchTypeKeys.GET_PROPERTY_DOCUMENTS
    | PropertySearchTypeKeys.SET_PROPERTY_DOCUMENTS;
  documents: IPropertyDocument[];
}

export interface IPropertySearchSetPropertyDetails {
  type: PropertySearchTypeKeys.SET_PROPERTY_DETAILS;
  details: IPropertyDetailsResponse;
}

export interface IPropertySearchSetSelectedPropertyDetail {
  type: PropertySearchTypeKeys.SET_SELECTED_PROPERTY_DETAIL;
  selectedPropertyDetail: IPropertyDetails;
}

export interface IPropertySearchSetParentDetails {
  type: PropertySearchTypeKeys.SET_PARENT_DETAILS;
  parentDetails: IParentDetails;
}

export interface IPropertyPagination {
  type: PropertySearchTypeKeys.SET_PROPERTY_PAGINATION;
  paginationDetails: IPagination;
}

export interface IPropertyDocumentsDataAction {
  type: PropertySearchTypeKeys.GET_PROPERTY_DOCUMENTS_DATA;
  propertyDocumentData: IPropertyDocumentData;
}

export interface IParentDetails {
  zoom: number;
  lat: number;
  lng: number;
  bounds: any;
  address: string;
}

export interface IPropertySearchRequest {
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  types: string[];
  county: string;
  locationType: google.maps.GeocoderLocationType;
}

export interface IPropertyDetailsResponse {
  maxResultsCount: number;
  referenceId: number;
  orderItemId: number;
  litePropertyList: IPropertyDetails[];
}

export interface IPropertyDetails {
  sequenceId: string;
  propertyId: string;
  apn: string;
  latitude: string;
  longitude: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  county: string;
  streetName: string;
  streetType: string;
  streetNumber: string;
  streetDir: string;
  streetPostDir: string;
  sqFoot: string;
  yearBuilt: string;
  unit: string;
  landUseDescription: string;
  lotSize: string;
  zone: string;
  owner: string;
  country: string;
}

export interface IPropertyDocument {
  id: number;
  propertyProductName: string;
  productPrice: number;
  monthlyAllowanceThreshold: number;
  isCombinedReport: boolean;
  isPriceApplicable: boolean;
  propertyProductUsageDetail: IPropertyProductUsageDetail;
  includeInCombinedReport?: boolean;
}

export interface IPropertyProductUsageDetail {
  monthToDateUsage: number;
  productId: number;
  isCached: boolean;
}

interface IApnDetails {
  apn: string;
  zipCode: string;
}

interface IPropertyInfo {
  apnDetails: IApnDetails;
}

export interface ICombinedReportOptions {
  hasPropertyProfile: boolean;
  hasTaxMap: boolean;
  hasTransactionHistory: boolean;
  hasComparableSales: boolean;
}

interface IReportOptions {
  isDocumentIncluded: boolean;
  combinedReportOptions?: ICombinedReportOptions;
}

export interface IPropertyDocumentDownloadRequest {
  reportId: number;
  propertyInfo: IPropertyInfo;
  reportOptions?: IReportOptions;
}

export interface IPagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface IPropertyDocumentData {
  propertyAddressData: IPropertyAddressData;
  propertyProfileData: IPropertyProfileData;
  taxMapData: ITaxMapData;
  comparableSalesData: IComparableSalesData;
}

export interface IComparableSalesData {
  comparablePropertiesSummary: IComparablePropertiesSummary;
  comparablesStatisticsData: IComparablesStatisticsData;
  comparableProperties: IComparableProperty[];
  comparableSalesMapAsBase64: string;
}

export interface IComparableProperty {
  id: number;
  distanceFromSubject: string;
  locationInformation: ILocationInformation;
  situsAddress: ISitusAddress;
  propertyCharacteristics: IPropertyCharacteristics;
  lastMarketSaleInformation: ILastMarketSaleInformation;
}

export interface IComparablePropertiesSummary {
  salePrice: IComparablePropertiesStatistics;
  loanAmount: IComparablePropertiesStatistics;
  bedrooms: IComparablePropertiesStatistics;
  bathrooms: IComparablePropertiesStatistics;
  livingArea: IComparablePropertiesStatistics;
  pricePerSqFt: IComparablePropertiesStatistics;
}

export interface IComparablePropertiesStatistics {
  id: number;
  label: string;
  average: string;
  high: string;
  low: string;
}

export interface IComparablesStatisticsData {
  id: number;
  apn: string;
  propertyAddress: string;
  salePrice: string;
  yearBuilt: string;
  bedrooms: string;
  baths: string;
  livingArea: string;
  recordingDate: string;
  distanceFromSubject: string;
}

export interface ITaxMapData {
  assessorMapsAsBase64: string[];
}

export interface IPropertyAddressData {
  propertyAddress: string;
  streetAddress: string;
  cityStateZip: string;
}

export interface IPropertyProfileData {
  propertyDetailsData: IPropertyDetailsData;
  recordedDocumentUri: string;
}

export interface IPropertyDetailsData {
  subjectProperty: ISubjectProperty;
  ownerInformation: IOwnerInformation;
  locationInformation: ILocationInformation;
  siteInformation: ISiteInformation;
  propertyCharacteristics: IPropertyCharacteristics;
  taxInformation: ITaxInformation;
  lastMarketSaleInformation: ILastMarketSaleInformation;
  priorSaleInformation: IPriorSaleInformation;
  processedData: IProcessedData;
}

export interface ISubjectProperty {
  situsAddress: ISitusAddress;
}

export interface ISitusAddress {
  county: string;
  city: string;
  situsCarrierRoute: string;
  state: string;
  streetAddress: string;
  zip9: string;
}

export interface IOwnerInformation {
  ownerNames: string;
  ownerVestingInfo: IOwnerVestingInfo;
}

export interface IOwnerVestingInfo {
  vestingOwner: string;
}

export interface ILocationInformation {
  legalDescription: string;
  apn: string;
  alternateAPN: string;
  subdivision: string;
  censusTract: string;
  tractNumber: string;
  legalLot: string;
  legalBlock: string;
}

export interface ISiteInformation {
  zoning: string;
  landUse: string;
}

export interface IPropertyCharacteristics {
  grossArea: string;
  livingArea: string;
  totalRooms: string;
  bedrooms: string;
  baths: string;
  firePlaceIndicator: string;
  numberOfStories: string;
  garageArea: string;
  basementArea: string;
  pool: string;
  airConditioning: string;
  heatType: string;
  style: string;
  quality: string;
  yearBuilt: string;
}

export interface ITaxInformation {
  totalTaxableValue: string;
  propertyTax: string;
  taxExemption: string;
  marketValue: string;
  marketLandValue: string;
  marketImprovValue: string;
  marketImprovValuePercent: string;
}

export interface ILastMarketSaleInformation {
  deedType: string;
  salePrice: string;
  sellerName: string;
  lender: string;
  recordingDate: string;
}

export interface IPriorSaleInformation {
  priorDeedType: string;
  priorSaleDate: string;
  priorSalePrice: string;
  priorDocNumber: string;
}

export interface IProcessedData {
  propertyAddress: string;
  mailingAddress: string;
  taxYearArea: string;
  mapCoord: string;
  ownerPhone: string;
  yearBuilt: string;
  lotSize: string;
  units: string;
  bathrooms: string;
  parking: string;
  saleRecDate: string;
  transferDocumentNumber: string;
  pricePerSquareFoot: string;
  secondMortgageAmount: string;
  firstMortgageAmount: string;
  firstMortgageType: string;
  recordingDate: string;
  improvements: string;
}

export interface IComparableSalesSearchReportFilters {
  radiusFromSubjectProperty: string;
  areaVariance: string;
  monthsBack: string;
  minBedRooms: string;
  maxBedRooms: string;
  minBathRooms: string;
  maxBathRooms: string;
}
