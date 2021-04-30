import express from 'express';

import { addSubmit, editSubmit, getAllSubmits, getAllUsersSubmits, getOneUserSubmit, updatePdfReady } from '../controllers/submit';
import { auth } from '../middleware';
import csrf from 'csurf';
const csrfProtection = csrf();

const router = express.Router();

router.route('/').post(csrfProtection,auth, addSubmit);
router.route('/').get(csrfProtection,auth,getAllSubmits);
router.route('/usersubmits/:uuid').get(csrfProtection,auth,getOneUserSubmit);
router.route('/').put(csrfProtection,auth,editSubmit);
router.route('/pdfready').put(csrfProtection,auth,updatePdfReady);
router.route('/usersubmits').get(csrfProtection,auth,getAllUsersSubmits);

export default router;
