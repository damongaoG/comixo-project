import {StripeResponse} from "./stripe-response";

export interface PackageDimensions {
  height?: number;
  length?: number;
  weight?: number;
  width?: number;
  lastResponse?: StripeResponse;
  rawJsonObject?: any;
}
