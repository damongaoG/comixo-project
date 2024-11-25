import { ResultError } from "./result-error";

export interface ResultVo {
    data?: any;
    error?: ResultError;
    code: number;
}