import {Metadata} from "./metadata";

export interface Plan {
  active: boolean;
  amount: number;
  amountDecimal: number;
  billingScheme: string;
  created: number;
  currency: string;
  id: string;
  interval: string;
  intervalCount: number;
  livemode: boolean;
  metadata: Metadata;
  object: string;
  product: string;
  usageType: string;
}
