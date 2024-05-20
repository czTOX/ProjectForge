import {
  UserLogin,
  UserRegistration,
  ResponseSingle,
  User,
  MyTeamsResponse,
  MyAllResponse,
  MyProjectsResponse,
  UserSettings,
} from '../models';
import axiosInstance from './base';

/**
 * loginUser API call
 *
 * @async
 * @param {UserLogin} content
 * @returns {Promise<ResponseSingle<User>>}
 */
export const loginUser = async (
  content: UserLogin
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/login', { ...content });
  return response.data;
};

/**
 * logoutUser API call
 *
 * @async
 * @returns {Promise<ResponseSingle<string>>}
 */
export const logoutUser = async (): Promise<ResponseSingle<string>> => {
  const response = await axiosInstance.post('/users/logout');
  return response.data;
};

/**
 * registerUser API call
 *
 * @async
 * @param {UserRegistration} content
 * @returns {Promise<ResponseSingle<User>>}
 */
export const registerUser = async (
  content: UserRegistration
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/register', { ...content });
  return response.data;
};

/**
 * getSingle API call
 *
 * @async
 * @returns {Promise<ResponseSingle<User>>}
 */
export const getSingle = async (): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.get(`/users/`);
  return response.data;
};

/**
 * editSingle API call
 *
 * @async
 * @param {UserSettings} content
 * @returns {Promise<ResponseSingle<User>>}
 */
export const editSingle = async (
  content: UserSettings
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/edit', { ...content }, {
    headers: {
      'Content-Type': 'multipart/form-data'
  }});
  return response.data;
};

/**
 * getMyTeams API call
 *
 * @async
 * @returns {Promise<
 *   ResponseSingle<MyTeamsResponse>
 * >}
 */
export const getMyTeams = async (): Promise<
  ResponseSingle<MyTeamsResponse>
> => {
  const response = await axiosInstance.get(`/users/teams`);
  return response.data;
};

/**
 * getMyProjects API call
 *
 * @async
 * @returns {Promise<
 *   ResponseSingle<MyProjectsResponse>
 * >}
 */
export const getMyProjects = async (): Promise<
  ResponseSingle<MyProjectsResponse>
> => {
  const response = await axiosInstance.get(`/users/projects`);
  return response.data;
};

/**
 * getMyAll API call
 *
 * @async
 * @returns {Promise<
 *   ResponseSingle<MyAllResponse>
 * >}
 */
export const getMyAll = async (): Promise<
  ResponseSingle<MyAllResponse>
> => {
  const response = await axiosInstance.get(`/users/all`);
  return response.data;
};