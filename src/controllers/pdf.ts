import { Response } from 'express';
import path from 'path';
import { Submit } from '../entity/Submit';
import { generatePdf } from '../services/generatePdf';

export const addSubmitPdf = async (req: any, res: Response) => {
  const { uuid } = req.body;

  try {
    const submit = await Submit.findOneOrFail({ where: { uuid } });

    const data = {
      submit,
    };

    await generatePdf(data, 'submit');
    return res.json({
      msg: 'ok',
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const fetchPdf = async (req: any, res: Response) => {
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
