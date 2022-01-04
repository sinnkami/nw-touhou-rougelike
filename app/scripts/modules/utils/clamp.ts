/**
 * 最大値及び最小値な値へ返還
 * @param value
 * @param min
 * @param max
 * @returns 最小値以上最大値以内な数値
 */
const clamp = (value: number, min: number, max: number): number => {
	return Math.min(Math.max(value, min), max);
};

export default clamp;
