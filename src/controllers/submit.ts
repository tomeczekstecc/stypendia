import { validate } from 'class-validator';
import { Response } from 'express';
import { Any } from 'typeorm';

import { Submit, User } from '../entity';
import { msg } from '../parts/messages';
import { generatePdf, makeLog, saveRollbar } from '../services';
import { mapErrors } from '../utils';

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
    if (Object.keys(errors).length > 0) {
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);

      return res.status(400).json(errors);
    }

    const num = (await (await Submit.find()).length) + 10000;

    const submit = new Submit({
      ...req.body,
      numer: `WN-${num}-v1-20`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      pupilFirstName:
        (req.body.isSelf === '1' && user.firstName) || req.body.pupilFirstName,
      pupilLastName:
        (req.body.isSelf === '1' && user.lastName) || req.body.pupilLastName,
      pupilEmail:
        (req.body.isSelf === '1' && user.email) || req.body.pupilEmail,

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
    // ****************************** LOG *********************************//
    INFO = msg.client.ok.subCreated;
    STATUS = 'success';
    makeLog(OBJECT, submit.id, ACTION, CONTROLLER, INFO, STATUS, req);
    // ********************************************************************//

    const data = {
      submit,
    };
    await generatePdf(data, 'submit');

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

    const tempSubmit = await new Submit({ ...req.body }); // jako tymczasowy bo update nie ma save() i nie można walidować przed zapisem do bazy

    const errors = await validate(tempSubmit);

    if (errors.length > 0) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.unvalidated;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//

      return res.status(400).json(mapErrors(errors));
    }
    const submit = await Submit.update(
      { uuid: req.body.uuid },
      {
        ...req.body,
        pupilFirstName:
          (req.body.isSelf === '1' && user.firstName) ||
          req.body.pupilFirstName,
        pupilLastName:
          (req.body.isSelf === '1' && user.lastName) || req.body.pupilLastName,
        pupilEmail:
          (req.body.isSelf === '1' && user.email) || req.body.pupilEmail,
      }
    );

    // ****************************** LOG *********************************//
    INFO = msg.client.ok.subUpdated;
    STATUS = 'success';
    makeLog(OBJECT, tempSubmit.id, ACTION, CONTROLLER, INFO, STATUS, req);
    // ********************************************************************//
    const data = {
      tempSubmit,
    };
    await generatePdf(data, 'submit');
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      data: submit,
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
      data:submits,
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
