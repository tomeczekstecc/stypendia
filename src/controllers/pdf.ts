import { Response } from 'express';
import path from 'path';
import { Submit } from '../entity/Submit';
import { msg } from '../parts/messages';
import { generatePdf } from '../services/generatePdf';
import { makeLog } from '../services/makeLog';
import { saveRollbar } from '../services/saveRollbar';

const OBJECT = 'Submit';
let ACTION, INFO, STATUS, CONTROLLER;

export const addSubmitPdf = async (req: any, res: Response) => {
  CONTROLLER = 'addSubmitPdf';
  ACTION = 'generowanie pdf';
  const { uuid } = req.body;

  try {
    const submit = await Submit.findOneOrFail({ where: { uuid } });

    const data = {
      submit,
    };

    await generatePdf(data, 'submit');
    STATUS = 'success';
    INFO = msg.client.ok.pdfCreated;

    makeLog(
      req.session.userId,
      OBJECT,
      submit.id,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Wygenerowano!',
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd!',
    });
  }
};

export const fetchPdf = async (req: any, res: Response) => {
  CONTROLLER = 'fetchPdf';
  ACTION = 'pobieranie pdf';

  const { numer, type } = req.params;
  const fileName = `${numer}.pdf`;
  const options = {
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true,
      'content-disposition': 'attachment; filename=' + fileName, // gets ignored
      'content-type': 'application/pdf',
    },
  };

  const filePath = path.join(process.cwd(), 'pdfs', `${type}/`);

  try {
    res.sendFile(filePath + fileName, fileName, (err) => {
      STATUS = 'success';
      INFO = msg.client.ok.pdfFetched;

      makeLog(
        req.session.userId,
        OBJECT,
        filePath,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      res.status(201).json({
        resStatus: STATUS,
        msgPL: INFO,
        alertTitle: 'Pobrano!',
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
      msgPL: msg._500,
      msg: err.message,
      alertTitle: 'Błąd',
    });
  }
};
