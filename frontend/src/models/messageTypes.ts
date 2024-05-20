import { User } from './userTypes';

export interface Message {
  id: number;
  content: string;
  author: User;
}

export interface MessageCreate {
  content: string;
}