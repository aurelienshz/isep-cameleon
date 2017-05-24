import { getLocalState as getUserState } from './reducer';

export const ROLE_TEACHER  = "ROLE_TEACHER";
export const ROLE_CLIENT = "ROLE_CLIENT";
export const ROLE_STUDENT = "ROLE_STUDENT";

export function userHasRole(user, role) {
  if (user && user.roles) {
    const grantedAuthorities = user.roles.map(role => role.authority);
    return grantedAuthorities.indexOf(role) > -1;
  }
  return false;
}
