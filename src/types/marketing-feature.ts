import {StripeResponse} from "./stripe-response";

export interface MarketingFeature {
  name?: string;
  lastResponse?: StripeResponse;
  rawJsonObject?: any;
}
