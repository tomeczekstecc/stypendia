import { Request, Response } from 'express';
import crc from 'crc';
import md5 from 'md5';
import fs from 'fs';
import path from 'path';
import { FILE_MAX_SIZE } from '../config';
import { msgDis500 } from '../constantas';
import { File } from '../entity/File';
import { User } from '../entity/User';
// import { scanFile } from '../services/scanFile';
import { mapFileBody } from '../utils/mapFileBody';

const calculateChecksum = async (fileToShow) => {
  const file = path.join(process.cwd(), `${fileToShow.path}`);
  const buffer = fs.readFileSync(file);
  const md5h = md5(buffer);
  const crch = crc.crc32(buffer).toString(16);
  const checksum = crch + md5h;
  return checksum;
};

export const uploadFile = async (req: any, res: Response) => {
  console.log(req.body);
  const { type } = req.body;
  const allowedTypes = ['statement', 'report_card'];

  try {
    if (!allowedTypes.includes(type)) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        resStatus: 'error',
        msgPL: `Nieprawidłowty typ załącznika - dozwolone wartości to: ${allowedTypes.join(
          ', '
        )} `,
        msg: 'Invalid attachment type',
        alertTitle: 'Błąd załącznika',
      });
    }

    if (req.file.size > +FILE_MAX_SIZE) {
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        resStatus: 'error',
        msgPL: `Nieprawidłowa wielkość pliku - plik nie może przekroczyć 20MB`,
        msg: 'Invalid attachment type',
        alertTitle: 'Błąd załącznika',
      });
    }

    //TODO  chech  if file-type already exists - and delete old -https://www.youtube.com/watch?v=2Oov8miYK-g&t=1035s ???

    //TODO scanFile(req.file.path);
    // https://kainikhil.medium.com/installing-clamav-and-clam-f4d26d8150c4

    const user = await User.findOneOrFail(req.session.userId);
    const fileBody = mapFileBody(req.file);

    const checksum = await calculateChecksum(req.file);

    const file = await File.create({
      ...fileBody,
      type,
      checksum,
      user,
    }).save();

    const fileToShow = await File.findOneOrFail({
      where: { id: file.id },
      select: [
        'id',
        'type',
        'createdAt',
        'uuid',
        'checksum',
        'path',
        'fileName',
      ],
    });

    return res.status(201).json({
      resStatus: 'success',
      msgPL: 'Utworzono załącznik',
      msg: 'Attachment created',
      alertTitle: 'Utworzono załącznik',
      file: fileToShow,
    });

    //zapis do bazy
  } catch (err) {
    return res.status(500).json({
      resStatus: 'error',
      msgPL: msgDis500,
      err: err.message,
      msg: 'Something went wrong',
      alertTitle: 'Błąd załącznika',
    });
  }

  return res.json({ success: 'Zapisano plik' });
};

export const downloadFile = async (req: any, res: Response) => {
  const { id } = req.params;

  const file = await File.findOneOrFail({
    where: { id },
    select: ['fileName', 'path'],
  });

  const { path: pathF, fileName } = file;
  const filePath = path.join(process.cwd(), pathF);
  const options = {
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'content-disposition': 'attachment; filename=' + fileName, // gets ignored
      'content-type': 'application/pdf',
    },
  };

  try {
    res.sendFile(filePath, (err) => {
      if (err) {
        res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getFileInfo = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const file = await File.findOneOrFail({
      where: { id },
      select: ['fileName'],
    });
    return res.status(200).json({ file });
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const fileToDelete = await File.findOneOrFail(id);

    const file = await File.delete(id);
    fs.unlinkSync(fileToDelete.path);
    return res.status(200).json({ type: fileToDelete.type });
  } catch (err) {
    console.log(err);
  }
};
