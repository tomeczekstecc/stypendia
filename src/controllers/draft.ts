import { Request, Response } from 'express';

import { msgDis500 } from '../constantas';
import { Draft } from '../entity/Draft';
import { Submit } from '../entity/Submit';
import { User } from '../entity/User';
import { makeLog } from '../services/makeLog';
import { saveRollbar } from '../services/saveRollbar';


const OBJECT = 'Draft';
let ACTION, INFO, STATUS, CONTROLLER;

//
//
//add a wnioski
//

export const addDraft = async (req: any, res: Response) => {
  let errors: any = {};
  CONTROLLER = 'addDraft';
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


    const draft = await Draft.create({
      ...req.body,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      pupilFirstName: req.body.pupilFirstName || user.firstName,
      pupilLastName: req.body.pupilLastName || user.lastName,
      pupilEmail: req.body.pupilEmail || user.email,

      user,
    });



    await draft.save();
    // ****************************** LOG *********************************//
    INFO = 'Pomyślnie utworzono wniosek roboczy';
    STATUS = 'success';
    makeLog(user.id, OBJECT, draft.id, ACTION, CONTROLLER, INFO, STATUS);
    // ********************************************************************//

    return res.status(201).json({
      resStaus: 'success',
      msg: 'Submit created',
      msgPL: INFO,
      data: draft,
    });
  } catch (err) {
   STATUS = 'error';
   saveRollbar(CONTROLLER, err.message, STATUS);
   return res.status(500).json({
     resStatus: STATUS,
     msgPL: msgDis500,
     msg: err.message,
     alertTitle: 'Błąd',
   });
  }
};

//
//
//edit a wnioski
//

export const editDraft = async (req: any, res: Response) => {
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


    const draft = await Submit.update(id, {
      ...req.body,
    });
    // ****************************** LOG *********************************//
    INFO = 'Zaktualizowano wniosek';
    STATUS = 'success';
    makeLog(user.id, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
    // ********************************************************************//

    return res.status(201).json({
      staus: STATUS,
      msg: INFO,
      msgDis: 'Submit updated',
      data: draft,
    });
  } catch (err) {
    // rollbar
    return res.status(500).json({
      status: 'error',
      err,
      msg: err.message,
      msgPL: msgDis500,
    });
  }
};

//
//get all post
//
export const getAllDrafts = async (req: Request, res: Response) => {
  try {
    //find posts,  include users data
    const drafts = await Draft.find({ relations: ['user'] });

    return res.status(201).json({
      stau: 'success',
      msg: 'Post fetched',
      msgDis: 'Pobrano wszystkie wpisy',
      count: drafts.length,
      data: drafts,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};
export const getAllUsersDrafts = async (req:any, res: Response) => {
  try {
    //find posts,  include users data
    const drafts = await Draft.find({where: {userId: req.session.userId}})


    return res.status(201).json({
      resStatus: 'success',
      msgPl: 'Pobrano dane o draftach',
      msg: 'Pobrano wszystkie drafty',
      count: drafts.length,
       drafts,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};
