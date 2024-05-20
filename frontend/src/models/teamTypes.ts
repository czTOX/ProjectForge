import { User } from './userTypes';
import { Project } from './projectTypes';

/**
 * Interface Team
 *
 * @export
 * @interface Team
 * @typedef {Team}
 */
export interface Team {
  id: string;
  name: string;
  inviteCode: string;
  users: [WorksAt];
  projects: [Project];
}

/**
 * Interface for Team with user's permission level
 *
 * @export
 * @interface TeamWithRole
 * @typedef {TeamWithRole}
 */
export interface TeamWithRole {
  id: string;
  name: string;
  inviteCode: string;
  users: [WorksAt];
  projects: [Project];
  permissionLevel: number;
}

/**
 * Interface for editing a Team
 *
 * @export
 * @interface TeamEdit
 * @typedef {TeamEdit}
 */
export interface TeamEdit {
  id: string;
  name: string;
}

/**
 * Interface for creating a Team
 *
 * @export
 * @interface NewTeam
 * @typedef {NewTeam}
 */
export interface NewTeam {
  name: string;
}

/**
 * Interface for joining a Team
 *
 * @export
 * @interface JoinTeam
 * @typedef {JoinTeam}
 */
export interface JoinTeam {
  inviteCode: string;
}

/**
 * Interface for MyTeams response from the server
 *
 * @export
 * @interface MyTeamsResponse
 * @typedef {MyTeamsResponse}
 */
export interface MyTeamsResponse {
  id: string;
  worksAt: [{
    role: string;
    team: {
      id: string;
      name: string;
      _count: {
        users: number;
      }
    }
  }];
}

/**
 * Interface for Team and User relation
 *
 * @export
 * @interface WorksAt
 * @typedef {WorksAt}
 */
export interface WorksAt {
  id: string;
  role: string;
  permissionLevel: number;
  team: Team;
  user: User;
}

/**
 * Interface for all TeamMembers
 *
 * @export
 * @interface TeamMembers
 * @typedef {TeamMembers}
 */
export interface TeamMembers {
  workers: [WorksAt];
}

/**
 * Interface for user's role change
 *
 * @export
 * @interface RoleChange
 * @typedef {RoleChange}
 */
export interface RoleChange {
  work: WorksAt;
}

/**
 * Interface for user's new role
 *
 * @export
 * @interface NewRole
 * @typedef {NewRole}
 */
export interface NewRole {
  workId: string;
  role: string;
  permissionLevel: number;
}

/**
 * Interface for new user role from a form
 *
 * @export
 * @interface NewRoleForm
 * @typedef {NewRoleForm}
 */
export interface NewRoleForm {
  role: number;
}