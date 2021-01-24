import csrf from 'csurf';
import { Router } from 'express';
import { changePass } from '../controllers';
import { auth } from '../middleware';
const csrfProtection = csrf();
const router = Router();

router.post('/', csrfProtection, auth, changePass);

export default router;
