import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { msgDis500 } from '../constantas';
import { Post } from '../entity/Wniosek';
import { User } from '../entity/User';

//
//add a post
//

export const addPost = async (req: Request, res: Response) => {
  const { userUuid, title, body } = req.body;

  try {
    const user = await User.findOne({ uuid: userUuid });

    if (!user) {
      return res.status(400).json({
        status: 'fail',
        msg: 'No such user',
        msgDis: 'Nie znaleziono uzytkownika',
      });
    }

    const post = await Post.create({ userUuid, title, body, user });
    const errors = await validate(post);
    if (errors.length > 0) throw errors;
    await post.save();
    return res.status(201).json({
      stau: 'success',
      msg: 'Post created',
      msgDis: 'Utworzono wpis',
      count: 1,
      data: post,
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
    const posts = await Post.find({ relations: ['user'] });

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
