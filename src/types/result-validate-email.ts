import {ResultError} from "./result-error";

export interface ResultValidateEmail {
  error?: ResultError;
  code: number;
}
