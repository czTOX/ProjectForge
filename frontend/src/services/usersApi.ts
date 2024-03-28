import {
  UserLogin,
  UserRegistraion,
  ResponseSingle,
  User,
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
  content: UserRegistraion
): Promise<ResponseSingle<User>> => {
  const response = await axiosInstance.post('/users/register', { ...content });
  return response.data;
};