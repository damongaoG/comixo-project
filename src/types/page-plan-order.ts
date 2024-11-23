import { PageableObject } from "./page-object";
import {PlanOrderVo} from "./plan-order-vo";
import { SortObject } from "./sor-object";

export interface PagePlanOrder {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  size: number;
  content: PlanOrderVo[];
  number: number;
  sort: SortObject[];
  numberOfElements: number;
  pageable: PageableObject;
  empty: boolean;
}
