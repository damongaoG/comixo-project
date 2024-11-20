import { CardVO } from "./card-vo";
import { ResultError } from "./result-error";

export interface ResultCardVO {
    data: CardVO[];
    error?: ResultError;
    code: number;
}