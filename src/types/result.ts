import { ResultError } from "./result-error";

export interface Result {
    data?: any;
    error?: ResultError;
    code: number;
}