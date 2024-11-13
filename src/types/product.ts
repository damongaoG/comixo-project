import {MarketingFeature} from "./marketing-feature";
import {Metadata} from "./metadata";

export interface Product {
  active: boolean;
  created: number;
  defaultPrice: string;
  id: string;
  images?: string[];
  livemode: boolean;
  marketingFeatures?: Array<MarketingFeature>;
  metadata?: Metadata;
  name: string;
  object: string;
  taxCode: string;
  type: string;
  updated: number;
}
