import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { msgDis500 } from '../constantas';
import { Submit } from '../entity/Submit';
import { User } from '../entity/User';
import { SubmitHistory } from '../entity/SubmitHistory';


const OBJECT = 'SubmitHistory';
let ACTION, INFO, STATUS, CONTROLLER;
//
//
//add a wnioski
//

export const addSubmitHistory = async (req: any, res: Response) => {
  
  try {
    const user = await User.findOne({ id: req.session.userId });
    const submit = await Submit.findOne({ id: req.body.submitId });

    if (!user || !submit) {
      return res.status(400).json({
        status: 'fail',
        msg: 'No such user or wni',
        msgDis: 'Nie znaleziono uzytkownika lub wniosku',
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
    if (errors.length > 0) throw errors;

    await submitHistory.save();

    return res.status(201).json({
      stau: 'success',
      msg: 'SubmitHistory created',
      msgDis: 'Utworzono wpis w historii wniosku',
      count: 1,
      data: SubmitHistory,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      err,
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};

//
//get all post
//
export const getAllSubmitsHistory = async (req: Request, res: Response) => {
  try {
    //find posts,  include users data
    const submits_history = await SubmitHistory.find({ relations: ['submits'] });

    return res.status(201).json({
      stau: 'success',
      msg: 'History fetched',
      msgDis: 'Pobrano wszystkie wpisy',
      count: submits_history.length,
      data: submits_history,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};
