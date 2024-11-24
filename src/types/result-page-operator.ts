import { PageOperatorVo } from "./page-operator-vo";
import { ResultError } from "./result-error";

export interface ResultPageOperator {
    data: PageOperatorVo;
    error?: ResultError;
    code: number;
}
