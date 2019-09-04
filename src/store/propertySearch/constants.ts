export enum PropertyDocument {
  PropertyProfile = 1,
  ComparableSales,
  TaxMap,
  TransactionHistory,
  RecordedDocs = 99,
  Combined
}

export enum PropertyDocumentModal {
  CombinedReportOptions,
  CombinedReportPaymentAcknowledgment,
  ComparableSalesReportOptions,
  PropertyProfileHTMLView,
  CombinedReportComponent
}

export enum ComparableSalesTableType {
  Subject,
  Statistics
}

export enum PropertyTypes {
  Residential,
  Commercial
}

export const ComparableSalesRadiusOptions = Array.from(
  { length: 9 },
  (_, x) => (x + 1) * 5
).map(x => ({ name: x.toString() + " miles", value: x.toString() + " miles" }));

export const ComparableSalesAreaVarianceOptions = Array.from(
  { length: 20 },
  (_, x) => (x + 1) * 5
).map(x => ({ name: x.toString() + "%", value: x.toString() + "%" }));

export const ComparableSalesMonthsBackOptions = Array.from(
  { length: 24 },
  (_, x) => x + 1
).map(x => ({ name: x.toString(), value: x.toString() }));

export const ComparableSalesRoomsOptions = Array.from(
  { length: 10 },
  (_, x) => x + 1
).map(x => ({ name: x.toString(), value: x.toString() }));

export const paymentDisclaimer = `In accordance with state regulations, charges for some Property Information Reports may apply.
  By checking the box below and clicking the 'Continue' button below,
  you are acknowledging that you will be responsible for any charges accrued for reports ordered during this session.`;

export const acknowledgment = `I agree to all charges for property reports and documents that I may incur during this session.`;

export const chargeDisclaimer = `To process payments for products and services, we may require certain personal information, which will be received
  and may be stored by the third party outsourced payment providers processing your transaction. First American will
  not store your credit card information. Please review the privacy policies of our third party outsourced payment
  providers Vindicia - Privacy Policy and Chase Paymentech - Privacy Policy. All transaction charges incurred in a
  single business day will be aggregated and processed on the following week, and the charge appearing on your credit
  card statement shall reflect a total of your weekly transactions.`;

export const disclaimerHTMLView = `IMPORTANT â READ CAREFULLY: THIS REPORT IS NOT AN INSURED PRODUCT OR SERVICE OR A REPRESENTATION
 OF THE CONDITION OF TITLE TO REAL PROPERTY. IT IS NOT AN ABSTRACT, LEGAL OPINION, OPINION OF TITLE,
 TITLE INSURANCE COMMITMENT OR PRELIMINARY REPORT, OR ANY FORM OF TITLE INSURANCE OR GUARANTY.
 THIS REPORT IS ISSUED EXCLUSIVELY FOR THE BENEFIT OF THE APPLICANT THEREFOR, AND MAY NOT BE
 USED OR RELIED UPON BY ANY OTHER PERSON. THIS REPORT MAY NOT BE REPRODUCED IN ANY MANNER WITHOUT
 FIRST AMERICANâS PRIOR WRITTEN CONSENT. FIRST AMERICAN DOES NOT REPRESENT OR WARRANT THAT THE
 INFORMATION HEREIN IS COMPLETE OR FREE FROM ERROR, AND THE INFORMATION HEREIN IS PROVIDED WITHOUT
 ANY WARRANTIES OF ANY KIND, AS-IS, AND WITH ALL FAULTS. AS A MATERIAL PART OF THE CONSIDERATION
 GIVEN IN EXCHANGE FOR THE ISSUANCE OF THIS REPORT, RECIPIENT AGREES THAT FIRST AMERICANâS SOLE
 LIABILITY FOR ANY LOSS OR DAMAGE CAUSED BY AN ERROR OR OMISSION DUE TO INACCURATE INFORMATION
 OR NEGLIGENCE IN PREPARING THIS REPORT SHALL BE LIMITED TO THE FEE CHARGED FOR THE REPORT.
 RECIPIENT ACCEPTS THIS REPORT WITH THIS LIMITATION AND AGREES THAT FIRST AMERICAN WOULD NOT HAVE
 ISSUED THIS REPORT BUT FOR THE LIMITATION OF LIABILITY DESCRIBED ABOVE. FIRST AMERICAN MAKES NO
 REPRESENTATION OR WARRANTY AS TO THE LEGALITY OR PROPRIETY OF RECIPIENTâS USE OF THE INFORMATION HEREIN.`;

// This will be replaced by real data, when api integration is implemented.
export const mockFarms = [
  "Michelle Farm long",
  "North Acquisition",
  "NY Farm",
  "NJ Exploration",
  "SoCal Beaches",
  "UT Mnt Areas",
  "Chicago High Rises",
  "Farming List 6/3/19",
  "US Post Office, Camelback Street, Newport Beach"
];
