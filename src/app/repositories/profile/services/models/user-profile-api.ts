import { ProfileInformation } from './profile-information.model';

export type UserProfileApi = Omit<ProfileInformation, 'role'>;
