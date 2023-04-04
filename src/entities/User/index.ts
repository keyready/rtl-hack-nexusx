export { userActions, userReducer } from './model/slice/userSlice';
export { getUserAuthData } from './model/selectors/getUserAuthData/getUserAuthData';
export { getUserInited } from './model/selectors/getUserInited/getUserInited';
export { isUserAdmin, isUserManager, getUserRoles } from './model/selectors/getUserRoles';

export type {
    User,
    UserSchema,
} from './model/types/user';
export { UserRoles } from './model/consts/consts';
