import { Router } from 'express';
import { resend, verify } from '../controllers/verify'

const router = Router();

router.post('/verify', verify);
router.post('/resend', resend);

export default router;
