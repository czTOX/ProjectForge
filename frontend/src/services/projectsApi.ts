import { CustomFile, EditProject, Message, MessageCreate, NewProject, Project, ResponseSingle } from "../models";
import axiosInstance from "./base";


export const createProject = async (
  content: NewProject
): Promise<ResponseSingle<Project>> => {
  const response = await axiosInstance.post('/projects/new', { ...content, deadline: content.deadline ? content.deadline.toISOString() : null });
  return response.data;
};

export const getSingle = async (
  projectId: string
): Promise<ResponseSingle<Project>> => {
  const response = await axiosInstance.get(`/projects/${projectId}`);
  return response.data;
};

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

export const addFiles = async (
  content: FormData
): Promise<ResponseSingle<Project>> => {
  const response = await axiosInstance.post(`/projects/files/new`, content, {
    headers: {
      'Content-Type': 'multipart/form-data'
  }});
  return response.data;
};

export const deleteFile = async (
  id: string,
): Promise<ResponseSingle<CustomFile>> => {
  const response = await axiosInstance.get(`/projects/files/delete/${id}`);
  return response.data;
};


//messages

export const postMessage = async (
  projectId: string,
  content: MessageCreate,
): Promise<ResponseSingle<Message>> => {
  const response = await axiosInstance.post(`/projects/messages/new`, {projectId: projectId, ...content});
  return response.data;
};