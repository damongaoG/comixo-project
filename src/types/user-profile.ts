export interface UserProfile {
  id: string;
  userId: string;
  integral: number;
  stripeClientId: string;
  currentUsage?: number;
  planId?: string;
}
