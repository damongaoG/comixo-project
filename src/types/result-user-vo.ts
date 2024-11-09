import { ResultError } from "./result-error";
import { UserVo } from "./user-vo";

export interface ResultUserVo {
    data: UserVo;
    error?: ResultError;
    code: number;
  }