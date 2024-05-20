export function addLeadingZeros(input: string | number, wantedLenght: number): string {
  let res: string = input.toString();
  while ( res.length < wantedLenght) {
    res = '0' + res;
  }
  return res;
}