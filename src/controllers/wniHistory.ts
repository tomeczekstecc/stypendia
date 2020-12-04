import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { msgDis500 } from '../constantas';
import { Wni } from '../entity/Wniosek';
import { User } from '../entity/User';
import { WniHistory } from '../entity/WniHistory';

//
//
//add a wnioski
//

export const addWniHistory = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ id: req.session.userId });
    const wniosek = await Wni.findOne({ id:req.body.wniId});

    if (!user || !wniosek) {
      return res.status(400).json({
        status: 'fail',
        msg: 'No such user or wni',
        msgDis: 'Nie znaleziono uzytkownika lub wniosku',
      });
    }

    const wniHistory = WniHistory.create({
      ...req.body,
      wniId: wniosek.id,
      userId: req.session.userId,
      wniosek,
      user
    });
    const errors = await validate(wniHistory);
    if (errors.length > 0) throw errors;

    await wniHistory.save();

    return res.status(201).json({
      stau: 'success',
      msg: 'WniHistory created',
      msgDis: 'Utworzono wpis w historii wniosku',
      count: 1,
      data: wniHistory,
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
export const getAllWniHistory = async (req: Request, res: Response) => {
  try {
    //find posts,  include users data
    const wnioski_history = await WniHistory.find({ relations: ['wni'] });

    return res.status(201).json({
      stau: 'success',
      msg: 'History fetched',
      msgDis: 'Pobrano wszystkie wpisy',
      count: wnioski_history.length,
      data: wnioski_history,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};
