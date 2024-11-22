import { BookVO } from "./books-vo";
import { ResultError } from "./result-error";

export interface ResultBook {
    data: BookVO;
    error?: ResultError;
    code: number;
}