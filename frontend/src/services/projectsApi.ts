import { CustomFile, EditProject, Message, MessageCreate, NewProject, Project, ResponseSingle } from "../models";
import axiosInstance from "./base";


/**
 * createProject API call
 *
 * @async
 * @param {NewProject} content
 * @returns {Promise<ResponseSingle<Project>>}
 */
export const createProject = async (
  content: NewProject
): Promise<ResponseSingle<Project>> => {
  const response = await axiosInstance.post('/projects/new', { ...content, deadline: content.deadline ? content.deadline.toISOString() : null });
  return response.data;
};

/**
 * getSingle API call
 *
 * @async
 * @param {string} projectId
 * @returns {Promise<ResponseSingle<Project>>}
 */
export const getSingle = async (
  projectId: string
): Promise<ResponseSingle<Project>> => {
  const response = await axiosInstance.get(`/projects/${projectId}`);
  return response.data;
};

/**
 * editProject API call
 *
 * @async
 * @param {string} projectId
 * @param {EditProject} content
 * @returns {Promise<ResponseSingle<Project>>}
 */
export const editProject = async (
  projectId: string,
  content: EditProject
): Promise<ResponseSingle<Project>> => {
  const response = await axiosInstance.post(`/projects/${projectId}/edit`, {
    id: projectId,
    name: content.name,
    description: content.description,
    budget: content.budget, 
    deadline: content.deadline || null,
    active: content.active,
  });
  return response.data;
};

/**
 * addFiles API call
 *
 * @async
 * @param {FormData} content
 * @returns {Promise<ResponseSingle<Project>>}
 */
export const addFiles = async (
  content: FormData
): Promise<ResponseSingle<Project>> => {
  const response = await axiosInstance.post(`/projects/files/new`, content, {
    headers: {
      'Content-Type': 'multipart/form-data'
  }});
  return response.data;
};

/**
 * deleteFile API call
 *
 * @async
 * @param {string} id
 * @returns {Promise<ResponseSingle<CustomFile>>}
 */
export const deleteFile = async (
  id: string,
): Promise<ResponseSingle<CustomFile>> => {
  const response = await axiosInstance.get(`/projects/files/delete/${id}`);
  return response.data;
};

//messages

/**
 * postMessage API call
 *
 * @async
 * @param {string} projectId
 * @param {MessageCreate} content
 * @returns {Promise<ResponseSingle<Message>>}
 */
export const postMessage = async (
  projectId: string,
  content: MessageCreate,
): Promise<ResponseSingle<Message>> => {
  const response = await axiosInstance.post(`/projects/messages/new`, {projectId: projectId, ...content});
  return response.data;
};