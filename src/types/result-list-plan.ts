import {Plan} from "./plan";
import {ResultError} from "./result-error";

export interface ResultListPlan {
  data: Array<Plan>;
  error?: ResultError;
  code: number
}
