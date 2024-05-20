import { Task, TaskMin } from './taskTypes';
import { Message } from './messageTypes';
import { Team } from './teamTypes';

export interface Project {
  id: string;
  name: string;
  description: string;
  budget: number;
  deadline: Date;
  active: boolean;
  team: Team;
  tasks: [Task];
  messages: [Message];
  files: [CustomFile],
}

export interface ProjectMin {
  id: string;
  name: string;
  teamName: string;
  _count: {
    tasks: number;
  }
}

export interface EditProject {
  name: string;
  description: string;
  budget: number;
  deadline: Date | null;
  active: boolean;
}

export interface NewProject {
  name: string;
  teamId: string;
  description: string;
  budget: number;
  deadline: Date;
}

export interface ProjectLineInterface {
  id: string;
  name: string;
  tasks: [TaskMin];
}

export interface MyProjectsResponse {
  id: string;
  worksAt: [{
    team: {
      id: string;
      projects: [{
        id: string;
        name: string;
        tasks: [TaskMin];
      }];
    };
  }];
}


export interface CustomFile {
  id: string;
  originalName: string,
  fileName: string,
  size: number,
  type: string,
  projectId: string,
}