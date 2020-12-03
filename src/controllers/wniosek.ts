import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { msgDis500 } from '../constantas';
import { Wni } from '../entity/Wniosek';
import { User } from '../entity/User';

//
//
//add a post
//

export const addWniosek = async (req: any, res: Response) => {
  try {
    const user = await User.findOne({ id: req.session.userId });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msg: 'No such user',
        msgDis: 'Nie znaleziono uzytkownika',
      });
    }

    const wni = Wni.create({
      ...req.body,
      userId: req.session.userId,
      userUuid: user.uuid,
      user,
    });
    const errors = await validate(wni);
    if (errors.length > 0) throw errors;

    await wni.save();

    return res.status(201).json({
      stau: 'success',
      msg: 'Wniosek created',
      msgDis: 'Utworzono wniosek',
      count: 1,
      data: wni,
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
export const getAllPosts = async (req: Request, res: Response) => {
  try {
    //find posts,  include users data
    const posts = await Wni.find({ relations: ['user'] });

    return res.status(201).json({
      stau: 'success',
      msg: 'Post fetched',
      msgDis: 'Pobrano wszystkie wpisy',
      count: posts.length,
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      status: 'fail',
      msg: err.message,
      msgDis: msgDis500,
    });
  }
};
