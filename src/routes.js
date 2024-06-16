import express from 'express';
import scoresRoutes from './features/scores/scores.routes.js'

const route = express.Router();

/**
 * GET route for the API home.
 * Sends a simple message to confirm the API is accessible.
 * @name /api
 * @function
 * @memberof module:routes~mainRouter
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
route.get('/api', (req, res) => {
  res.send('home');
});

/**
 * Use the routes defined in the scores module.
 * Mounts the scores routes at the /api/scores path.
 * @name /api/scores
 * @function
 * @memberof module:routes~mainRouter
 * @inner
 * @param {string} path - Express path.
 * @param {router} middleware - Express router.
 */
route.use('/api/scores', scoresRoutes);

export default route;
