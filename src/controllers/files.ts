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
import { makeLog } from '../services/makeLog';
import { saveRollbar } from '../services/saveRollbar';

const OBJECT = 'Files';
let ACTION, INFO, STATUS, CONTROLLER;

const calculateChecksum = async (fileToShow) => {
  const file = path.join(process.cwd(), `${fileToShow.path}`);
  const buffer = fs.readFileSync(file);
  const md5h = md5(buffer);
  const crch = crc.crc32(buffer).toString(16);
  const checksum = crch + md5h;
  return checksum;
};

export const uploadFile = async (req: any, res: Response) => {
  CONTROLLER = 'uploadFile';
  ACTION = 'dodawanie pliku';
  const { type } = req.body;
  const allowedTypes = ['statement', 'report_card'];

  try {
    if (!allowedTypes.includes(type)) {
      fs.unlinkSync(req.file.path);
      STATUS = 'error';
      INFO = `Nieprawidłowty typ załącznika - dozwolone wartości to: ${allowedTypes.join(
        ', '
      )} `;

      makeLog(
        req.session.userId,
        OBJECT,
        undefined,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: 'Invalid attachment type',
        alertTitle: 'Błąd załącznika',
      });
    }

    if (req.file.size > +FILE_MAX_SIZE) {
      fs.unlinkSync(req.file.path);
      STATUS = 'error';
      INFO = `Nieprawidłowa wielkość pliku - plik nie może przekroczyć 20MB`;
      makeLog(
        req.session.userId,
        OBJECT,
        undefined,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
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
    STATUS = 'success';
    INFO = 'Utworzono załącznik';
    makeLog(
      req.session.userId,
      OBJECT,
      fileToShow.id,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      msg: 'Attachment created',
      alertTitle: 'Utworzono załącznik',
      file: fileToShow,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const downloadFile = async (req: any, res: Response) => {
  CONTROLLER = 'downloadFile';
  ACTION = 'pobieranie pliku';
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
      STATUS = 'success';
      INFO = 'Udało się pobrać plik';

      makeLog(
        req.session.userId,
        OBJECT,
        file.id,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      res.status(201).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: 'File downloaded successfully',
        alertTitle: 'Udana próba pobrania pliku',
      });

      if (err) {
        res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const getFileInfo = async (req: Request, res: Response) => {
  CONTROLLER = 'getFileInfo';
  const { id } = req.params;
  try {
    const file = await File.findOneOrFail({
      where: { id },
      select: ['fileName'],
    });
    return res.status(200).json({ file });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const deleteFile = async (req: any, res: Response) => {
  CONTROLLER = 'deleteFile';
  ACTION = 'usuwanie pliku';
  const { id } = req.params;
  try {
    const fileToDelete = await File.findOneOrFail(id);

    const file = await File.delete(id);
    fs.unlinkSync(fileToDelete.path);
    STATUS = 'success';
    INFO = 'pomyślnie usunięto plik';

    makeLog(
      req.session.userId,
      OBJECT,
      fileToDelete.id,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );
    return res.status(200).json({ type: fileToDelete.type });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msgDis500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};
