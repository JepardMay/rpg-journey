import { LevelObjectKeys } from '../models';

export const levels: LevelObjectKeys = {
  skill: [0, 300, 900, 2700, 6500, 1400, 23000, 34000, 48000, 64000, 85000],
  user: [0, 300, 900, 2700, 6500, 1400, 23000, 34000, 48000, 64000, 85000],
};

export const calculateLevel = (xp: number, type: string) => {
  const points: number[] = levels[type];
  
  if (!points) {
    throw new Error(`Invalid type: ${type}`);
  }

  if (xp < points[0]) return 1;
  for (let i = 0; i < points.length; i++) {
    if (xp >= points[i] && xp < points[i + 1]) {
      return i + 1;
    }
  }
  return points.length;
};

export const calculatePercent = (xp: number, level: number, type: string) => {
  const points: number[] = levels[type];
  
  if (!points) {
    throw new Error(`Invalid type: ${type}`);
  }

  return `${((xp - points[level - 1]) * 100) / (points[level] - points[level - 1])}%`;
};
