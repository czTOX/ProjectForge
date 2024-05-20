import { JoinTeam, NewRole, NewTeam, ResponseSingle, Team, TeamEdit, TeamMembers, TeamWithRole, WorksAt } from "../models";
import axiosInstance from "./base";


export const createTeam = async (
  content: NewTeam
): Promise<ResponseSingle<Team>> => {
  const response = await axiosInstance.post('/teams/new', { ...content });
  return response.data;
};

export const joinTeam = async (
  content: JoinTeam
): Promise<ResponseSingle<WorksAt>> => {
  const response = await axiosInstance.post('/teams/join', { ...content });
  return response.data;
};

export const getSingle = async (
  teamId: string
): Promise<ResponseSingle<TeamWithRole>> => {
  const response = await axiosInstance.get(`/teams/${teamId}`);
  return response.data;
};

export const getMembers = async (
  teamId: string
): Promise<ResponseSingle<TeamMembers>> => {
  const response = await axiosInstance.get(`/teams/${teamId}/members`);
  return response.data;
};

export const editTeam = async (
  content: TeamEdit
): Promise<ResponseSingle<Team>> => {
  const response = await axiosInstance.post(`/teams/${content.id}/edit`, { ...content });
  return response.data;
};

export const changeRole = async (
  content: NewRole
): Promise<ResponseSingle<WorksAt>> => {
  const response = await axiosInstance.post(`/teams/changeRole`, content);
  return response.data;
};