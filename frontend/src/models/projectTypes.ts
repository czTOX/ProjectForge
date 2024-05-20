import { Task, TaskMin } from './taskTypes';
import { Message } from './messageTypes';
import { Team } from './teamTypes';

/**
 * Interface for Project
 *
 * @export
 * @interface Project
 * @typedef {Project}
 */
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

/**
 * Interface for ProjectMin
 *
 * @export
 * @interface ProjectMin
 * @typedef {ProjectMin}
 */
export interface ProjectMin {
  id: string;
  name: string;
  teamName: string;
  _count: {
    tasks: number;
  }
}

/**
 * Interface for editing a project
 *
 * @export
 * @interface EditProject
 * @typedef {EditProject}
 */
export interface EditProject {
  name: string;
  description: string;
  budget: number;
  deadline: Date | null;
  active: boolean;
}

/**
 * Interface for creating a project
 *
 * @export
 * @interface NewProject
 * @typedef {NewProject}
 */
export interface NewProject {
  name: string;
  teamId: string;
  description: string;
  budget: number;
  deadline: Date;
}

/**
 * Interface for ProjectLine component
 *
 * @export
 * @interface ProjectLineInterface
 * @typedef {ProjectLineInterface}
 */
export interface ProjectLineInterface {
  id: string;
  name: string;
  tasks: [TaskMin];
}

/**
 * Interface MyProjects response
 *
 * @export
 * @interface MyProjectsResponse
 * @typedef {MyProjectsResponse}
 */
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

/**
 * Interface for CustomFile
 *
 * @export
 * @interface CustomFile
 * @typedef {CustomFile}
 */
export interface CustomFile {
  id: string;
  originalName: string,
  fileName: string,
  size: number,
  type: string,
  projectId: string,
}