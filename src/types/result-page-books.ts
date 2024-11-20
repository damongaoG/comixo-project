import { PageBooks } from "./page-books";
import { ResultError } from "./result-error";

export interface ResultPageBooks {
    data: PageBooks;
    error?: ResultError;
    code: number;
}