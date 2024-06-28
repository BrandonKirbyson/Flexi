import type { AuthUser } from './User';
import type { Name } from './Util';

export interface AdminData {
	email: string;
	name: Name;
}

export interface AdminUser extends AdminData, AuthUser {}
