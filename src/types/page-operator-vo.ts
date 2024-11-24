import { OperatorVo } from "./operator-vo";
import { PageableObject } from "./page-object";
import { SortObject } from "./sor-object";

export interface PageOperatorVo {
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
    size: number;
    content: OperatorVo[];
    number: number;
    sort: SortObject[];
    numberOfElements: number;
    pageable: PageableObject;
    empty: boolean;
}