import type { AuthUser, BaseUser } from './User';

export interface AdminData extends BaseUser {}

export interface AdminUser extends AdminData, AuthUser {}
