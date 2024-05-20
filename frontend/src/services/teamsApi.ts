import { JoinTeam, NewRole, NewTeam, ResponseSingle, Team, TeamEdit, TeamMembers, TeamWithRole, WorksAt } from "../models";
import axiosInstance from "./base";


/**
 * createTeam API call
 *
 * @async
 * @param {NewTeam} content
 * @returns {Promise<ResponseSingle<Team>>}
 */
export const createTeam = async (
  content: NewTeam
): Promise<ResponseSingle<Team>> => {
  const response = await axiosInstance.post('/teams/new', { ...content });
  return response.data;
};

/**
 * joinTeam API call
 *
 * @async
 * @param {JoinTeam} content
 * @returns {Promise<ResponseSingle<WorksAt>>}
 */
export const joinTeam = async (
  content: JoinTeam
): Promise<ResponseSingle<WorksAt>> => {
  const response = await axiosInstance.post('/teams/join', { ...content });
  return response.data;
};

/**
 * getSingle API call
 *
 * @async
 * @param {string} teamId
 * @returns {Promise<ResponseSingle<TeamWithRole>>}
 */
export const getSingle = async (
  teamId: string
): Promise<ResponseSingle<TeamWithRole>> => {
  const response = await axiosInstance.get(`/teams/${teamId}`);
  return response.data;
};

/**
 * getMembers API call
 *
 * @async
 * @param {string} teamId
 * @returns {Promise<ResponseSingle<TeamMembers>>}
 */
export const getMembers = async (
  teamId: string
): Promise<ResponseSingle<TeamMembers>> => {
  const response = await axiosInstance.get(`/teams/${teamId}/members`);
  return response.data;
};

/**
 * editTeam API call
 *
 * @async
 * @param {TeamEdit} content
 * @returns {Promise<ResponseSingle<Team>>}
 */
export const editTeam = async (
  content: TeamEdit
): Promise<ResponseSingle<Team>> => {
  const response = await axiosInstance.post(`/teams/${content.id}/edit`, { ...content });
  return response.data;
};

/**
 * changeRole API call
 *
 * @async
 * @param {NewRole} content
 * @returns {Promise<ResponseSingle<WorksAt>>}
 */
export const changeRole = async (
  content: NewRole
): Promise<ResponseSingle<WorksAt>> => {
  const response = await axiosInstance.post(`/teams/changeRole`, content);
  return response.data;
};