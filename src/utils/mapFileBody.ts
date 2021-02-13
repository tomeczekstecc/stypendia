import { File } from '../entity/File';

export const mapFileBody = (file: any) => {
  const {
    originalname: orginalName,
    mimetype: mimeType,
    destination,
    filename: fileName,
    path,
    size,
  } = file;

  const newBody = {
    orginalName,
    mimeType,
    destination,
    fileName,
    path,
    size,
  };

  return newBody;
};
