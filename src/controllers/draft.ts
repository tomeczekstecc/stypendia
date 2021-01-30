import { Response } from 'express';

import { Draft, Submit, User } from '../entity';
import { msg } from '../parts/messages';
import { makeLog, saveRollbar } from '../services';

const OBJECT:any = 'Draft';
let ACTION: any, INFO, STATUS, CONTROLLER:any;

//
//add a wnioski
//

export const addDraft = async (req: any, res: Response) => {
  CONTROLLER = 'addDraft';
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
    INFO = msg.client.ok.draftSucceed;
    STATUS = 'success';
    makeLog(OBJECT, draft.id, ACTION, CONTROLLER, INFO, STATUS, req);
    // ********************************************************************//

    return res.status(201).json({
      resStaus: 'success',
      msgPL: INFO,
      data: draft,
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

export const editDraft = async (req: any, res: Response) => {
  CONTROLLER = 'editSubmit';
  ACTION = 'edytowanie';

  const { id } = req.params;
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      // ****************************** LOG *********************************//
      INFO = msg.client.fail.noUser;
      STATUS = 'error';
      makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
      // ********************************************************************//

      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
      });
    }

    const draft = await Submit.update(id, {
      ...req.body,
    });
    // ****************************** LOG *********************************//
    INFO = msg.client.ok.subUpdated;
    STATUS = 'success';
    makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
    // ********************************************************************//

    return res.status(201).json({
      staus: STATUS,
      msgPL: INFO,
      data: draft,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
    });
  }
};

//
//get all post
//
export const getAllDrafts = async (req: any, res: Response) => {
  try {
    //find posts,  include users data
    const drafts = await Draft.find({ relations: ['user'] });
    INFO = msg.client.ok.draftsFetched;
    STATUS = 'success';
    makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
    //
    return res.status(201).json({
      resStatus: 'success',
      msgPL: INFO,
      count: drafts.length,
      data: drafts,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
    });
  }
};

export const getAllUsersDrafts = async (req: any, res: Response) => {
  CONTROLLER = 'getAllUsersDrafts';
  ACTION = 'pobieranie danych draftów';
  try {
    const drafts = await Draft.find({ where: { userId: req.session.userId } });
    INFO = msg.client.ok.draftsFetched;
    STATUS = 'success';
    makeLog(OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS, req);
    //
    return res.status(200).json({
      resStatus: 'success',
      msgPL: INFO,
      count: drafts.length,
      data: drafts,
    });
  } catch (err) {
    STATUS = 'error';
    saveRollbar(CONTROLLER, err.message, STATUS);
    return res.status(500).json({
      resStatus: STATUS,
      msgPL: msg._500,
      msg: err.message,
    });
  }
};
