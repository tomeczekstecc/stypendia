import {Router} from 'express'
import { changePass } from '../controllers/changePass'
import { auth} from '../middleware'
import csrf from 'csurf';
const csrfProtection = csrf();
const router =Router()

router.post('/', csrfProtection,auth, changePass);



export default router;