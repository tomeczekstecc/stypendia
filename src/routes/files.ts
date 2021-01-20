import express from 'express';
import { deleteFile, downloadFile, getFileInfo, uploadFile } from '../controllers/files';
import { auth } from '../middleware';
import { upload } from '../services/upload';
import csrf from 'csurf';
const csrfProtection = csrf();

const router = express.Router();

router.post('/upload', auth, upload.single('file'), uploadFile);
router.get('/download/:id', auth, downloadFile);
router.get('/info/:id', auth, getFileInfo);
router.delete('/:id', auth, deleteFile);

export default router;
