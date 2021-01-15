import express from 'express';
import { uploadFile } from '../controllers/files';
import { auth } from '../middleware';
import { upload } from '../services/upload';

const router = express.Router();

router.post('/upload', auth, upload.single('file'), uploadFile);

export default router;
