import { BookVO } from "./books-vo";
import { Pageable } from "./pageable";
import { Sort } from "./sort";

export interface PageBooks {
    content: BookVO[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}