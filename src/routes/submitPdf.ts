import {Router} from 'express'
import { addSubmitPdf } from '../controllers/submitPdf'

const router = Router()


router.post('/', addSubmitPdf)

export default router