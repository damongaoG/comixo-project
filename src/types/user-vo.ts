import { SysRoleVo } from "./sys-role-vo";

export interface UserVo {
    id: string;
    email: string;
    status: number;
    nickName?: string;
    registerIP?: string;
    roles?: SysRoleVo[];
  }