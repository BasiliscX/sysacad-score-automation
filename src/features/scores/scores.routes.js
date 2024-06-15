import express from 'express';
import { getCalifications } from './scores.controller.js';

const router = express.Router();

router.post('/', getCalifications);

router.get('/', (req, res) => {
    res.send('califications feature!');
});

export default router;
