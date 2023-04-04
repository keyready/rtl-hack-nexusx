import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRoles } from '../consts/consts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const isUserAdmin = createSelector(
    getUserRoles,
    (userRoles) => Boolean(userRoles?.includes(UserRoles.ADMIN)),
);
export const isUserManager = createSelector(
    getUserRoles,
    (userRoles) => Boolean(userRoles?.includes(UserRoles.MANAGER)),
);
