/**
 * ディープコピーメソッド
 * @param msec
 * @returns
 */
const clone = (obj: unknown): unknown => JSON.parse(JSON.stringify(obj));
export default clone;
