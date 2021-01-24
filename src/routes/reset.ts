import {Router} from 'express'
import { passwordReset, sendResetMail } from '../controllers'
import { guest } from '../middleware'
import csrf from 'csurf';
const csrfProtection = csrf();
const router =Router()

router.post('/email', csrfProtection,guest, sendResetMail)
router.post('/reset', csrfProtection,guest, passwordReset)


export default router;