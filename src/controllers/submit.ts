import { validate } from 'class-validator';
import { Response } from 'express';
import { Any, getRepository } from 'typeorm';

import { Submit, User, File } from '../entity';
import { msg } from '../parts/messages';
import { generatePdf, makeLog, saveRollbar } from '../services';
import { checkForAtt } from '../services';
import { mapErrors, mapTabs } from '../utils';

const OBJECT: any = 'Submit';
let ACTION, INFO: string, STATUS: string, CONTROLLER: string;

//
//
//add a wnioski
//

export const addSubmit = async (req: any, res: Response) => {
  let errors: any = {};
  CONTROLLER = 'addSubmit';
  ACTION = 'dodawanie';
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      INFO = msg.client.fail.noUser;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);

      return res.status(400).json({
        status: STATUS,
        msgPL: INFO,
      });
    }

    const peselExists = await Submit.find({ pupilPesel: req.body.pupilPesel });

    if (peselExists.length > 0) {
      errors.pupilPesel = msg.client.fail.peselExists;
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.peselExists;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//
    }

    const allErrors = await checkForAtt(req, errors, 'new');

    if (Object.keys(allErrors).length > 0) {
      STATUS = 'error';
      INFO = msg.client.fail.attGeneralERR;
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      return res.status(400).json(allErrors);
    }

    const num = (await (await Submit.find()).length) + 10000;

    const submit = new Submit({
      ...req.body,
      numer: `WN-${num}-v1-20`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      pupilFirstName:
        (req.body.isSelf === 'Pełnoletni uczeń' && user.firstName) ||
        req.body.pupilFirstName,
      pupilLastName:
        (req.body.isSelf === 'Pełnoletni uczeń' && user.lastName) ||
        req.body.pupilLastName,
      pupilEmail:
        (req.body.isSelf === 'Pełnoletni uczeń' && user.email) ||
        req.body.pupilEmail,

      user,
    });

    errors = await validate(submit);

    if (errors.length > 0) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.unvalidated;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//
      return res.status(400).json(mapErrors(errors));
    }

    await submit.save();

    await getRepository(File)
      .createQueryBuilder('file')
      .update()
      .set({ submitId: submit.id })
      .where('tempSubmitId = :submitId', { submitId: req.body.tempUuid })
      .execute();

    const submitFiles = await File.find({ submitId: submit.id });

     const data = {
      submit,
      files: submitFiles,
      tabs1: mapTabs(submit, '1'),
      tabs2: mapTabs(submit, '2'),
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };

    await generatePdf(data, 'submit');






    // ****************************** LOG *********************************//
    INFO = msg.client.ok.subCreated;
    STATUS = 'success';
    makeLog(OBJECT, submit.id, ACTION, CONTROLLER, INFO, STATUS, req);
    // ********************************************************************//

    return res.status(201).json({
      resStatus: 'success',
      msgPL: INFO,
      data: submit,
      alertTitle: 'Utworzono!',
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

//
//
//edit a wnioski
//

export const editSubmit = async (req: any, res: Response) => {
  CONTROLLER = 'editSubmit';
  ACTION = 'edytowanie';
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.noUser;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//

      return res.status(400).json({
        status: STATUS,
        msgPL: INFO,
      });
    }
    let errors: any = {};
    const peselExists = await Submit.find({ pupilPesel: req.body.pupilPesel });

    if (peselExists.length > 0 && peselExists[0].id !== req.body.id) {
      errors.pupilPesel = msg.client.fail.peselExists;
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.peselExists;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//
    }

    const allErrors = await checkForAtt(req, errors, 'edit');

    if (Object.keys(allErrors).length > 0) {
      STATUS = 'error';
      INFO = msg.client.fail.attGeneralERR;
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      return res.status(400).json(allErrors);
    }

    const tempSubmit = await new Submit({ ...req.body }); // jako tymczasowy bo update nie ma save() i nie można walidować przed zapisem do bazy

    errors = await validate(tempSubmit);

    if (errors.length > 0) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.unvalidated;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//

      return res.status(400).json(mapErrors(errors));
    }

    await Submit.update(
      { uuid: req.body.uuid },
      {
        ...req.body,
        pupilFirstName:
          (req.body.isSelf === 'Pełnoletni uczeń' && user.firstName) ||
          req.body.pupilFirstName,
        pupilLastName:
          (req.body.isSelf === 'Pełnoletni uczeń' && user.lastName) ||
          req.body.pupilLastName,
        pupilEmail:
          (req.body.isSelf === 'Pełnoletni uczeń' && user.email) ||
          req.body.pupilEmail,
      }
    );

    // ****************************** LOG *********************************//
    INFO = msg.client.ok.subUpdated;
    STATUS = 'success';
    makeLog(OBJECT, tempSubmit.id, ACTION, CONTROLLER, INFO, STATUS, req);
    // ********************************************************************//
    const submitFiles = await File.find({ submitId: tempSubmit.id });
  
    const data = {
      submit: { ...tempSubmit },
      files: submitFiles,
      tabs1: mapTabs(tempSubmit, '1'),
      tabs2: mapTabs(tempSubmit, '2'),
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    };

    await generatePdf(data, 'submit');
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      alertTitle: 'Zaktualizowano!',
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

//
//get all submits
//
export const getAllSubmits = async (req: any, res: Response) => {
  try {
    const submits = await Submit.find({ relations: ['user'] });

    return res.status(200).json({
      resStatus: 'success',
      msgPL: msg.client.ok.subsFetched,
      count: submits.length,
      data: submits,
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

export const getAllUsersSubmits = async (req: any, res: Response) => {
  try {
    const submits = await Submit.find({
      where: { userId: req.session.userId },
    });

    return res.status(200).json({
      Status: 'success',
      msgPL: msg.client.ok.subsFetched,
      count: submits.length,
      data: submits,
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

export const getOneUserSubmit = async (req: any, res: Response) => {
  const { uuid } = req.params;

  try {
    const submit = await Submit.findOne({ where: { uuid } });

    return res.status(200).json({
      resStatus: 'success',
      msgPL: msg.client.ok.subFetched,
      msg: 'Fetched submit',

      submit,
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
