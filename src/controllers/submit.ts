import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { msgDis500 } from '../constantas';
import { Submit } from '../entity/Submit';
import { User } from '../entity/User';
import { mapErrors } from '../utils/mapErrors';

//
//
//add a wnioski
//

export const addSubmit = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msg: 'No such user',
        msgDis: 'Nie znaleziono uzytkownika',
      });
    }

    const submit = Submit.create({
      ...req.body,
      userId: req.session.userId,
      userUuid: user.uuid,
      user,
    });

    const errors = await validate(submit);

    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }

    await submit.save();

    return res.status(201).json({
      stau: 'success',
      msg: 'Wniosek created',
      msgDis: 'Utworzono wniosek',
      count: 1,
      data: submit,
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
//
//add a wnioski
//

export const editSubmit = async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msg: 'No such user',
        msgDis: 'Nie znaleziono uzytkownika',
      });
    }
    const tempSubmit = await Submit.create({ ...req.body }); // jako tymczasowy bo update nie ma save() i nie można walidować przed zapisem do bazy
    const errors = await validate(tempSubmit);
    console.log(errors);

    if (errors.length > 0) {
      return res.status(400).json(mapErrors(errors));
    }
    const submit = await Submit.update(id, {
      ...req.body,
    });
    return res.status(201).json({
      stau: 'success',
      msg: 'Wniosek updated',
      msgDis: 'Zaktualizowano wniosek',
      count: 1,
      data: submit,
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
