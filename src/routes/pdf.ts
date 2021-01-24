import {Router} from 'express'
import { addSubmitPdf, fetchPdf } from '../controllers'
import csrf from 'csurf';
const csrfProtection = csrf();
const router = Router()


router.post('/', csrfProtection,addSubmitPdf)
router.get('/:type/:numer', csrfProtection,fetchPdf)

export default router