import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { msgDis500 } from '../constantas';
import { Submit } from '../entity/Submit';
import { User } from '../entity/User';
import { makeLog } from '../services/makeLog';
import { mapErrors } from '../utils/mapErrors';

const OBJECT = 'Submit';
let ACTION, INFO, STATUS, CONTROLLER;

//
//
//add a wnioski
//

export const addSubmit = async (req: any, res: Response) => {
  let errors:any ={}
  CONTROLLER = 'addSubmit';
  ACTION = 'dodawanie';
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      INFO = 'Nie znaleziono użytkownika';
      STATUS = 'error';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);

      return res.status(400).json({
        status: STATUS,
        msg: 'No such user',
        msgPL: INFO,
      });
    }

const peselExists = await Submit.find({pupilPesel: req.body.pupilPesel})
console.log(peselExists)
if (peselExists.length>0){
  errors.pupilPesel= 'Ten PESEL został już wykorzystany';
  // ****************************** LOG *********************************//
  INFO = 'Pod tym numerem pesel jest już utworzony wniosek';
  STATUS = 'error';
  makeLog(user.id, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
  // ********************************************************************//

    if (Object.keys(errors).length > 0) {
      makeLog(user.id, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);

      return res.status(400).json(errors);
    }
}

    const num = (await (await Submit.find()).length) + 10000;

    const submit = await Submit.create({
      ...req.body,
      numer: `WN-${num}-v1-20`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      pupilFirstName: req.body.pupilFirstName || user.firstName,
      pupilLastName: req.body.pupilLastName || user.lastName,
      pupilEmail: req.body.pupilEmail || user.email,

      user,
    });

   errors = await validate(submit);

    if (errors.length > 0) {
      // ****************************** LOG *********************************//
      INFO = 'Wprowadzone dane nie spełniły warunków walidacji';
      STATUS = 'error';
      makeLog(user.id, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      // ********************************************************************//
      return res.status(400).json(mapErrors(errors));
    }

    await submit.save();
    // ****************************** LOG *********************************//
    INFO = 'Pomyślnie utworzono wniosek';
    STATUS = 'success';
    makeLog(user.id, OBJECT, submit.id, ACTION, CONTROLLER, INFO, STATUS);
    // ********************************************************************//

    return res.status(201).json({
      resStaus: 'success',
      msg: 'Submit created',
      msgPL: INFO,
      data: submit,
    });
  } catch (err) {
    // rollbar
    return res.status(500).json({
      status: 'fail',
      err,
      msg: err.message,
      msgDis: msgDis500,
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

  const { id } = req.params;
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      // ****************************** LOG *********************************//
      INFO = 'Nie znaleziono uzytkownika';
      STATUS = 'error';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      // ********************************************************************//

      return res.status(400).json({
        status: STATUS,
        msg: 'No such user',
        msgPL: INFO,
      });
    }
    const tempSubmit = await Submit.create({ ...req.body }); // jako tymczasowy bo update nie ma save() i nie można walidować przed zapisem do bazy
    const errors = await validate(tempSubmit);

    if (errors.length > 0) {
      // ****************************** LOG *********************************//
      INFO = 'Wprowadzone dane nie spełniły warunków walidacji';
      STATUS = 'error';
      makeLog(user.id, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      // ********************************************************************//

      return res.status(400).json(mapErrors(errors));
    }
    const submit = await Submit.update(id, {
      ...req.body,
    });
    // ****************************** LOG *********************************//
    INFO = 'Zaktualizowano wniosek';
    STATUS = 'success';
    makeLog(user.id, OBJECT, tempSubmit.id, ACTION, CONTROLLER, INFO, STATUS);
    // ********************************************************************//

    return res.status(201).json({
      staus: STATUS,
      msg: INFO,
      msgDis: 'Submit updated',
      data: submit,
    });
  } catch (err) {
    // rollbar
    return res.status(500).json({
      status: 'fail',
      err,
      msg: err.message,
      msgPL: msgDis500,
    });
  }
};

//
//get all post
//
export const getAllSubmits = async (req: Request, res: Response) => {
  try {
    //find posts,  include users data
    const submits = await Submit.find({ relations: ['user'] });

    return res.status(201).json({
      stau: 'success',
      msg: 'Post fetched',
      msgDis: 'Pobrano wszystkie wpisy',
      count: submits.length,
      data: submits,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};
