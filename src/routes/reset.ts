import {Router} from 'express'
import { passwordReset, sendResetMail } from '../controllers/reset'
import { guest } from '../middleware'

const router =Router()

router.post('/email', guest, sendResetMail)
router.post('/reset', guest, passwordReset)


export default router;