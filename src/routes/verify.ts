import { Router } from 'express';
import { resend, verify } from '../controllers/verify';
import { guest } from '../middleware';
import csrf from 'csurf';
const csrfProtection = csrf();
const router = Router();

router.post('/verify',  guest, verify);
router.post('/resend',  guest, resend);

export default router;
