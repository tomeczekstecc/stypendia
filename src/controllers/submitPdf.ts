import { Response } from 'express';
import { Submit } from '../entity/Submit';
import { generatePdf } from '../services/generatePdf';

export const addSubmitPdf = async (req: any, res: Response) => {
  const { submitId } = req.body;

  try {
    const submit = await Submit.findOneOrFail(submitId);

    const data = {
      submit,
    };

    await generatePdf(data, 'submit');
    return res.json({
      msg: 'ok',
    });
  } catch (e) {
    console.log(e, 'addSubmitPdf');
  }
};
