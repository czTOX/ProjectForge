import { EditTaskContent, NewTask, NewTaskWork, ResponseSingle, Task, TaskAssign, TaskWorkWithUser } from "../models";
import axiosInstance from "./base";


/**
 * createTask API call
 *
 * @async
 * @param {NewTask} content
 * @returns {Promise<ResponseSingle<Task>>}
 */
export const createTask = async (
  content: NewTask
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post('/tasks/new', { ...content, deadline: content.deadline ? content.deadline.toISOString() : null });
  return response.data;
};

/**
 * getSingle API call
 *
 * @async
 * @param {string} taskId
 * @returns {Promise<ResponseSingle<Task>>}
 */
export const getSingle = async (
  taskId: string
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.get(`/tasks/${taskId}`);
  return response.data;
};

/**
 * checkedTask API call
 *
 * @async
 * @param {string} taskId
 * @param {boolean} active
 * @returns {Promise<ResponseSingle<Task>>}
 */
export const checkedTask = async (
  taskId: string,
  active: boolean,
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post(`/tasks/done`, { taskId, active });
  return response.data;
};

/**
 * editSingle API call
 *
 * @async
 * @param {EditTaskContent} content
 * @returns {Promise<ResponseSingle<Task>>}
 */
export const editSingle = async (
  content: EditTaskContent
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post(`/tasks/edit`, { ...content, deadline: content.deadline ? content.deadline.toISOString() : null, userId: content.userId == "None" ? null : content.userId});
  return response.data;
};

/**
 * NewTaskWork API call
 *
 * @async
 * @param {NewTaskWork} content
 * @returns {Promise<ResponseSingle<TaskWorkWithUser>>}
 */
export const postTaskWork = async (
  content: NewTaskWork
): Promise<ResponseSingle<TaskWorkWithUser>> => {
  const response = await axiosInstance.post(`/tasks/newTaskWork`, { ...content} );
  return response.data;
};

/**
 * deleteTaskWork API call
 *
 * @async
 * @param {string} id
 * @returns {Promise<ResponseSingle<TaskWorkWithUser>>}
 */
export const deleteTaskWork = async (
  id: string,
): Promise<ResponseSingle<TaskWorkWithUser>> => {
  const response = await axiosInstance.get(`/tasks/${id}/deleteTaskWork`);
  return response.data;
};

//assign

/**
 * assignTask API call
 *
 * @async
 * @param {TaskAssign} content
 * @returns {Promise<ResponseSingle<Task>>}
 */
export const assignTask = async (
  content: TaskAssign
): Promise<ResponseSingle<Task>> => {
  const response = await axiosInstance.post(`/tasks/assign`, content );
  return response.data;
};