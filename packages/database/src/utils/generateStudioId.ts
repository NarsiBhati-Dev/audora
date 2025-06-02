import { nanoid } from "nanoid";

const generateStudioId = (studioName: string) => {
  const lowerCaseStudioName = studioName.toLowerCase();
  const id = `${lowerCaseStudioName}-${nanoid(6)}`;
  return id;
};

export default generateStudioId;
