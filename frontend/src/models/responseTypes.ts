/**
 * ResponseSingle type
 *
 * @export
 * @interface ResponseSingle
 * @typedef {ResponseSingle}
 * @template T
 */
export interface ResponseSingle<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
}

/**
 * ResponseMulti type
 *
 * @export
 * @interface ResponseMulti
 * @typedef {ResponseMulti}
 * @template T
 */
export interface ResponseMulti<T> {
  data: T[];
  status: 'success' | 'error';
  message?: string;
}