import { RolesBuilder } from 'nest-access-control';
import { Role } from './enums';

export const RBAC_POLICY: RolesBuilder = new RolesBuilder();

// prettier-ignore
RBAC_POLICY
  .grant(Role.RECEPTIONIST)
    .read('pet')
  .grant(Role.PROFESSIONAL)
    .extend(Role.RECEPTIONIST)
    .read('pet')
  .grant(Role.ADMIN)
    .extend(Role.PROFESSIONAL)
    .read('pet')
