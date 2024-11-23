import { ResultError } from "./result-error";
import { UserProfile } from "./user-profile";

export interface ResultUserProfile {
    data: UserProfile;
    error?: ResultError;
    code: number;
}