import {UserProfile} from '../types/user-profile';

interface UserProfileResponse {
  code: number;
  data: UserProfile;
  message?: string;
}

export const fetchUserProfileById = async (userId: string): Promise<UserProfile | null> => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_USER_PROFILE_URL}/by/user-id/${userId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    const result: UserProfileResponse = await response.json();

    if (result.code === 1) {
      return result.data;
    }
    return null;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    return null;
  }
};
