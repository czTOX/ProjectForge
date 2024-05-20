import { EditTaskContent, NewTask, NewTaskWork, ResponseSingle, Task, TaskAssign, TaskWorkWithUser } from "../models";
import axiosInstance from "./base";


export const createTask = async (
  content: NewTask
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post('/tasks/new', { ...content, deadline: content.deadline ? content.deadline.toISOString() : null });
  return response.data;
};

export const getSingle = async (
  taskId: string
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.get(`/tasks/${taskId}`);
  return response.data;
};

export const checkedTask = async (
  taskId: string,
  active: boolean,
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post(`/tasks/done`, { taskId, active });
  return response.data;
};

export const editSingle = async (
  content: EditTaskContent
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post(`/tasks/edit`, { ...content, deadline: content.deadline ? content.deadline.toISOString() : null, userId: content.userId == "None" ? null : content.userId});
  return response.data;
};

export const postTaskWork = async (
  content: NewTaskWork
): Promise<ResponseSingle<TaskWorkWithUser>> => {
  const response = await axiosInstance.post(`/tasks/newTaskWork`, { ...content} );
  return response.data;
};

export const deleteTaskWork = async (
  id: string,
): Promise<ResponseSingle<TaskWorkWithUser>> => {
  const response = await axiosInstance.get(`/tasks/${id}/deleteTaskWork`);
  return response.data;
};

//assign

export const assignTask = async (
  content: TaskAssign
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post(`/tasks/assign`, content );
  return response.data;
};