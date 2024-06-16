import express from 'express';
import { getCalifications } from './scores.controller.js';

const router = express.Router();

/**
 * POST route to fetch califications (scores).
 * Calls the getCalifications controller function.
 * @name /api/scores/
 * @function
 * @memberof module:routes/scores~scoresRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.post('/', getCalifications);

/**
 * GET route to confirm the califications feature.
 * Sends a simple message to confirm the route is active.
 * @name /api/scores/
 * @function
 * @memberof module:routes/scores~scoresRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.get('/', (req, res) => {
    res.send('califications feature!');
});

export default router;
