import { User } from './userTypes';

/**
 * Interface for Message
 *
 * @export
 * @interface Message
 * @typedef {Message}
 */
export interface Message {
  id: number;
  content: string;
  author: User;
}

/**
 * Interface for new messages
 *
 * @export
 * @interface MessageCreate
 * @typedef {MessageCreate}
 */
export interface MessageCreate {
  content: string;
}