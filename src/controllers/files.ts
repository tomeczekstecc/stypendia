import { Request, Response } from 'express';
import fs from 'fs';
import { FILE_MAX_SIZE } from '../config';
import { msgDis500 } from '../constantas';
import {scanFile} from '../services/scanFile'

export const uploadFile = (req: Request, res: Response) => {
  const { type } = req.body;
  const allowedTypes = ['statement', 'report_card'];

  console.log(req.file);

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

    //TODO  chech  if file-type already exists - and delete old -https://www.youtube.com/watch?v=2Oov8miYK-g&t=1035s


    //TODO scanFile(req.file.path);
    // https://kainikhil.medium.com/installing-clamav-and-clam-f4d26d8150c4
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
