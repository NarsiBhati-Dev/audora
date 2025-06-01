import { nanoid } from "nanoid";

const generateStudioId = (studioName: string) => `${studioName}-${nanoid(6)}`;

export default generateStudioId;
