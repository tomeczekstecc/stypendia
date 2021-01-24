import multer, { FileFilterCallback } from 'multer';

import path from 'path';
import fs from 'fs';
import { makeId } from '../utils';

export const upload = multer({
  storage: multer.diskStorage({
    destination: function (req: any, file, callback) {
      fs.mkdir(`files/${req.session.userId}`, function (err) {
        if (err) {
          console.log(`Nie utworzono folderu - ${err.message}`);
          return console.error(err);
        } else {
          console.log(`Folder utworzuny: files/${req.session.id} `);
        }
      });
      callback(null, `files/${req.session.userId}`);
    },
    filename: (req: any, file, callback) => {
      const name = makeId(25);
      callback(null, name + path.extname(file.originalname)); // e.g. jh34gh2v4y + .png
    },
  }),
  fileFilter: (req, file: any, callback: FileFilterCallback) => {
    if (
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'application/pdf'
    ) {
      callback(null, true);
    } else {
      // add error handler res.status(500)
      callback(new Error('To nie jest plik w dozwolonym formnacie '));
    }
  },
});
