import { atom } from 'recoil';

/**
 * is user logged in Atom
 *
 * @type {*}
 */
export const loggedInAtom = atom<boolean>({
  key: 'loggedIn',
  default: false,
});