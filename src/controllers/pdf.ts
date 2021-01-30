import { Response } from 'express';
import path from 'path';
import { Submit } from '../entity';
import { msg } from '../parts/messages';
import { generatePdf, makeLog, saveRollbar } from '../services';

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

      OBJECT,
      submit.id,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS, req
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
    return res.sendFile(filePath + fileName, fileName, (err) => {
      if (err) {
        return res.status(500).send({
          message: 'Could not download the file. ' + err,
        });
      }

      STATUS = 'success';
      INFO = msg.client.ok.pdfFetched;

      makeLog(

        OBJECT,
        filePath,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS, req
      );
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
