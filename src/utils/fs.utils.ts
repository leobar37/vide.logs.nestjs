import * as fs from 'fs';
export const readJsonFromPath = (path: string) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    return null;
  }
};
