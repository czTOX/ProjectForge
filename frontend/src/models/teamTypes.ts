import { User } from './userTypes';
import { Project } from './projectTypes';

export interface Team {
  id: string;
  name: string;
  inviteCode: string;
  users: [WorksAt];
  projects: [Project];
}

export interface TeamWithRole {
  id: string;
  name: string;
  inviteCode: string;
  users: [WorksAt];
  projects: [Project];
  permissionLevel: number;
}

export interface TeamEdit {
  id: string;
  name: string;
}

export interface NewTeam {
  name: string;
}

export interface JoinTeam {
  inviteCode: string;
}

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

export interface WorksAt {
  id: string;
  role: string;
  permissionLevel: number;
  team: Team;
  user: User;
}

export interface TeamMembers {
  workers: [WorksAt];
}

export interface RoleChange {
  work: WorksAt;
}

export interface NewRole {
  workId: string;
  role: string;
  permissionLevel: number;
}

export interface NewRoleForm {
  role: number;
}