import { validate } from 'class-validator';
import { Request, Response } from 'express';

import { Submit, User, SubmitHistory } from '../entity';
import { makeLog, saveRollbar } from '../services';
import { msg } from '../parts/messages';

const OBJECT = 'SubmitHistory';
let ACTION, INFO, STATUS, CONTROLLER;
//
//
//add a wnioski
//

export const addSubmitHistory = async (req: any, res: Response) => {
  CONTROLLER = 'addSubmitHistory';
  ACTION = 'dodawanie';
  try {
    const user = await User.findOne({ id: req.session.userId });
    const submit = await Submit.findOne({ id: req.body.submitId });

    if (!user || !submit) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.noUserNoSubmit;
      STATUS = 'error';

      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//

      return res.status(400).json({
        status: STATUS,
        msgPL: INFO,
      });
    }

    const submitHistory = SubmitHistory.create({
      ...req.body,
      submitId: submit.id,
      userId: req.session.userId,
      submit,
      user,
    });
    const errors = await validate(submitHistory);
    if (errors.length > 0) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.noUserNoSubmit;
      STATUS = 'error';

      makeLog(

        OBJECT,
        undefined,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS,
        req
      );
      // ********************************************************************//
      throw errors;
    }

    await submitHistory.save();

    return res.status(201).json({
      stau: 'success',
      msgDis: msg.client.ok.historyCreated,
      data: submitHistory,
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
export const getAllSubmitsHistory = async (req: Request, res: Response) => {
  try {
    const submitHistory = await SubmitHistory.find({
      relations: ['submits'],
    });

    return res.status(200).json({
      stau: 'success',
      msgPL: msg.client.ok.historiesFethed,
      count: submitHistory.length,
      data: submitHistory,
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
