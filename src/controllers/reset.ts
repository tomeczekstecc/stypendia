import { Response } from 'express';
import { isEmail, isEmpty, validate } from 'class-validator';
import { resetPassword } from '../middleware/auth';
import { User } from '../entity/User';
import { PasswordReset } from '../entity/PasswordReset';
import { sendMail } from '../services/mail';
import { msgDis500 } from '../constantas';
import { makeLog } from '../services/makeLog';
import { mapErrors } from '../utils/mapErrors';
import { saveRollbar } from '../services/saveRollbar';

const OBJECT = 'User';
let ACTION, INFO, STATUS, CONTROLLER;

export const sendResetMail = async (req: any, res: Response) => {
  CONTROLLER = 'sendResetMail';
  ACTION = 'generowanie maila resetu hasła';

  const { email, login } = req.body;

  try {
    let errors: any = {};

    if (isEmpty(email) || !email)
      errors.email = 'Musisz podać poprawny adres email';
    if (isEmpty(login) || !login)
      errors.login = 'Musisz podać poprawną nazwę użytkownika';
    if (!isEmail(email)) errors.email = 'Musisz podać poprawny adres email';

    // ****************************** LOG *********************************//
    INFO = 'Podany email nie jest w poprawnym formacie';
    STATUS = 'error';
    makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
    // ********************************************************************//

    if (Object.keys(errors).length > 0) return res.status(400).json(errors);

    const user = await User.findOne({ email, login });

    if (!user) {
      STATUS = 'error'
      INFO ='Nie udało się wysłać linka'

      return res.status(401).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: 'Couldnt send',
        alertTitle: 'Błąd',
      });
    }

    if (user) {
      const token = await PasswordReset.plaintextToken();

      const reset = await PasswordReset.create({ userId: user.id, token });

      await reset.save();

      await sendMail({
        to: email,
        subject: 'Zresetuj hasło',
        text: reset.url(token),
      });
      // ****************************** LOG *********************************//

      INFO = `Wysłano mail z linkiem do odzyskania hasła na adres: ${email}`;
      STATUS = 'success';
      makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);
      // ********************************************************************//
    }

    user.lastResetEmailAt = new Date();

    await user.save();

    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      msg: 'Reset mail send',
      alertTitle: 'Wysłano link',
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

export const passwordReset = async ({ query, body }, res: Response) => {
  CONTROLLER = 'passwordReset';
  ACTION = 'resetowanie hasła';

  const { id, token} = query;
  const { password, passwordConfirm } = body;

  let errors: any = {};

  if (password === '' || password === undefined)
    errors.password = 'Hasło nie może być puste';
  if (passwordConfirm !== password)
    errors.passwordConfirm = 'Hasła muszą być zgodne';
  if (Object.keys(errors).length > 0) {
    makeLog(undefined, OBJECT, undefined, ACTION, CONTROLLER, INFO, STATUS);

    return res.status(400).json(errors);
  }

  try {
    const reset = await PasswordReset.findOne(id);

    if (!reset) {

      // ****************************** LOG *********************************//
      INFO = 'Użyto niepoprawny token';
      STATUS = 'error';
      makeLog(
        undefined,
        OBJECT,
        undefined,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      // ********************************************************************//
      return res.status(400).json({
        resStatus: 'error',
        msgPL: INFO,
        msg: 'Invalid token',
        alertTitle:'Błąd'
      });
    }

    const user = await User.findOne(reset.userId);


    if (!user || !reset.isValid(token)) {
      // ****************************** LOG *********************************//
      INFO = 'Być może link był już przestarzały. Ponownie resetuj hasło. Odpowiedni link znajdziesz na stronie logowania';
      STATUS = 'error';
      makeLog(
        reset.userId,
        OBJECT,
        reset.userId,
        ACTION,
        CONTROLLER,
        INFO,
        STATUS
      );
      // ********************************************************************//
      return res.status(400).json({
        resStatus: STATUS,
        msgPL: INFO,
        msg: 'Invalid token',
        alertTitle: 'Nieudana zmiana hasła'
      });
    }

    user.password = password; // temp to validate

    errors = await validate(user);

    if (errors.length > 0) {
      makeLog(user.id, OBJECT, user.id, ACTION, CONTROLLER, INFO, STATUS);
      return res.status(400).json(mapErrors(errors));
    }




    await Promise.all([
      resetPassword(user.id, password),
      PasswordReset.delete({ userId: reset.userId }),
    ]);
    // ****************************** LOG *********************************//
    INFO = 'zmieniono hasło';
    STATUS = 'success';
    makeLog(
      reset.userId,
      OBJECT,
      reset.userId,
      ACTION,
      CONTROLLER,
      INFO,
      STATUS
    );
    // ********************************************************************//
    return res.status(201).json({
      resStatus: STATUS,
      msgPL: INFO,
      msg: 'Password has been changed',
      alertTitle: 'Udana zmiana hasła',
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
