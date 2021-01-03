import {Router} from 'express'
import { changePass } from '../controllers/changePass'
import { auth} from '../middleware'

const router =Router()

router.post('/', auth, changePass)



export default router;