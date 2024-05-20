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

export const loginUser = async (
  content: UserLogin
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/login', { ...content });
  return response.data;
};

export const logoutUser = async (): Promise<ResponseSingle<string>> => {
  const response = await axiosInstance.post('/users/logout');
  return response.data;
};

export const registerUser = async (
  content: UserRegistration
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/register', { ...content });
  return response.data;
};

export const getSingle = async (): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.get(`/users/`);
  return response.data;
};

export const editSingle = async (
  content: UserSettings
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/edit', { ...content }, {
    headers: {
      'Content-Type': 'multipart/form-data'
  }});
  return response.data;
};

export const getMyTeams = async (): Promise<
  ResponseSingle<MyTeamsResponse>
> => {
  const response = await axiosInstance.get(`/users/teams`);
  return response.data;
};

export const getMyProjects = async (): Promise<
  ResponseSingle<MyProjectsResponse>
> => {
  const response = await axiosInstance.get(`/users/projects`);
  return response.data;
};

export const getMyAll = async (): Promise<
  ResponseSingle<MyAllResponse>
> => {
  const response = await axiosInstance.get(`/users/all`);
  return response.data;
};