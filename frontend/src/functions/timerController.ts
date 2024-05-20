/**
 * Function for adding leading zeros before the number
 *
 * @export
 * @param {(string | number)} input
 * @param {number} wantedLenght
 * @returns {string}
 */
export function addLeadingZeros(input: string | number, wantedLenght: number): string {
  let res: string = input.toString();
  while ( res.length < wantedLenght) {
    res = '0' + res;
  }
  return res;
}