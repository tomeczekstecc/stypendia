import { Request, Response } from 'express';
import crc from 'crc';
import md5 from 'md5';
import fs from 'fs';
import path from 'path';

import { FILE_MAX_SIZE } from '../config';
import { File, User } from '../entity';
import { mapFileBody } from '../utils';
import { makeLog, saveRollbar } from '../services';
import { fileTypeAllowed, mimeTypeAllowed } from '../entity/types';
import { scanFile } from '../services/scanFile';
import { msg } from '../parts/messages';
import { getRepository } from 'typeorm';
import { CLIENT_RENEG_WINDOW } from 'tls';

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

  scanFile(req.file.path);

  const { type, submitTempId, submitId, clientIp } = req.body;

  req.clientIp = clientIp;

  try {
    if (!fileTypeAllowed.includes(type)) {
      fs.unlinkSync(req.file.path);
      STATUS = 'error';
      INFO =
        msg.client.fail.wrongAttType +
        ` - dozwolone wartości to: ${fileTypeAllowed.join(', ')} `;

      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      return res.status(200).json({
        resStatus: STATUS,
        msgPL: INFO,

        alertTitle: 'Błąd załącznika',
      });
    }
    if (!mimeTypeAllowed.includes(req.file?.mimetype)) {
      fs.unlinkSync(req.file.path);
      STATUS = 'error';
      INFO = msg.client.fail.mime;

      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      return res.status(200).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd załącznika',
      });
    }

    if (req.file?.size > +FILE_MAX_SIZE) {
      fs.unlinkSync(req.file.path);
      STATUS = 'error';
      INFO = msg.client.fail.attToBig;
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      return res.status(200).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd załącznika',
      });
    }

    //TODO  chech  if file-type already exists - and delete old -https://www.youtube.com/watch?v=2Oov8miYK-g&t=1035s ???

    //TODO scanFile(req.file.path);
    // https://kainikhil.medium.com/installing-clamav-and-clam-f4d26d8150c4

    const user = await User.findOneOrFail(req.session.userId);
    const fileBody = mapFileBody(req.file);

    const checksum = await calculateChecksum(req.file);

    const sames = await getRepository(File)
      .createQueryBuilder()
      .select()
      .where(
        '(tempSubmitId = :tempSubmitId1 OR submitId = :submitId1) AND checksum = :checksum1',
        {
          tempSubmitId1: submitTempId,
          submitId1: submitId,
          checksum1: checksum,
        }
      )
      .getCount();

    if (sames > 0) {
      fs.unlinkSync(req.file.path);
      STATUS = 'error';
      INFO = msg.client.fail.attSame;
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      return res.status(200).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd załącznika',
      });
    }

    const file = await new File({
      ...fileBody,
      type,
      tempSubmitId: submitTempId,
      submitId,
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
        'size',
      ],
    });
    STATUS = 'success';
    INFO = msg.client.fail.attCreated;
    makeLog(OBJECT, fileToShow.id, ACTION, CONTROLLER, INFO, STATUS, req);

    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Utworzono załącznik',
      file: fileToShow,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const downloadFile = async (req: any, res: Response) => {
  CONTROLLER = 'downloadFile';
  ACTION = 'pobieranie pliku';

  req.clientIp = req.body.clientIp;
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
    return res.sendFile(filePath, (err) => {
      STATUS = 'success';
      INFO = msg.client.ok.fileFetched;
      if (err) {
        return res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }
      makeLog(OBJECT, file.id, ACTION, CONTROLLER, INFO, STATUS, req);
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const getFileInfo = async (req: any, res: Response) => {
  CONTROLLER = 'getFileInfo';

  req.clientIp = req.body.clientIp;

  const { id } = req.params;
  try {
    const file = await File.findOne({
      where: { id },
      select: ['fileName'],
    });

    if (!file) {
      STATUS = 'error';
      INFO = msg.client.fail.noFile;
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd!',
      });
    }

    return res.status(200).json({ file });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const getUsersFiles = async (req: any, res: Response) => {
  CONTROLLER = 'getUsersFiles';

  req.clientIp = req.body.clientIp;

  const { userId } = req.session;
  try {
    const files = await File.find({
      where: { userId },
    });

    if (!files) {
      STATUS = 'error';
      INFO = msg.client.fail.noFile;
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Błąd!',
      });
    }

    return res.status(200).json({ files });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};

export const deleteFile = async (req: any, res: Response) => {
  CONTROLLER = 'deleteFile';
  ACTION = 'usuwanie pliku';

  req.clientIp = req.body.clientIp;

  const { id } = req.params;
  try {
    const fileToDelete = await File.findOneOrFail(id);

    const file = await File.delete(id);
    fs.unlinkSync(fileToDelete.path);
    STATUS = 'success';
    INFO = 'pomyślnie usunięto plik';

    makeLog(OBJECT, fileToDelete.id, ACTION, CONTROLLER, INFO, STATUS, req);
    return res.status(200).json({ type: fileToDelete.type });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};
