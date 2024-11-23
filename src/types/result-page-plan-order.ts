import { PagePlanOrder } from "./page-plan-order";
import {ResultError} from "./result-error";

export interface ResultPagePlanOrder {
  data: PagePlanOrder;
  error?: ResultError;
  code: number;
}