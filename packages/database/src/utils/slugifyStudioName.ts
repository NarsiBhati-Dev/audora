import { nanoid } from "nanoid";

const slugifyStudioName = (studioName: string) => {
  const lowerCaseStudioName = studioName.toLowerCase();
  const id = `${lowerCaseStudioName}-${nanoid(8)}`;
  return id;
};

export default slugifyStudioName;
