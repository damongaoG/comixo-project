import { SortObject } from "./sor-object";

export interface PageableObject {
    offset: number;
    sort: Array<SortObject>;
    paged: boolean;
    unpaged: boolean;
    pageNumber: number;
    pageSize: number;
}