import { UserRole } from './user-role.model';

export interface ProfileInformation {
  name: string;
  email: string;
  role: UserRole;
}
