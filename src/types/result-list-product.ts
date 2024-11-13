import {Product} from "./product";
import {ResultError} from "./result-error";

export interface ResultListProduct {
  data: Array<Product>;
  error?: ResultError;
  code: number
}
