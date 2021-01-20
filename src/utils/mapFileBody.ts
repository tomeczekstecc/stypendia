import { File } from '../entity/File';

export const mapFileBody = (file: any) => {
  console.log(file.originalname, 'file123');
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
