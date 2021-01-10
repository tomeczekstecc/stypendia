import {Router} from 'express'
import { addSubmitPdf, fetchPdf } from '../controllers/pdf'

const router = Router()


router.post('/', addSubmitPdf)
router.get('/:type/:numer', fetchPdf)

export default router