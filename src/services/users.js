import client from './main-client';

export const userLoginApi = credentials => client().post('/auth/local', credentials);
export const userLogoutApi = () => new Promise();
export const userRegisterApi = data => client().post('/auth/local/register', data);
export const userAuthmanagementApi = credentials => client().post('/authmanagement', credentials);

export const fetchAdminUsersApi = (url, params) => client().get(url, { params });
export const fetchAdminUsersCountApi = (url, params) => client().get(`${url}/count`, { params });
export const getUsersApi = params => client().get('/users', { params });
export const getUserApi = params => client().get(`/users/${params.id}`, { params });
export const addNewUserApi = data => client().post('/auth/local/register', data);
export const deleteUsersApi = params => client().delete(`/users/${params.id}`);
export const updateUsersApi = params => client().put(`/users/${params.id}`, params.values);
