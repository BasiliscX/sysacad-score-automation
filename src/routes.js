import express from 'express';
import scoresRoutes from './features/scores/scores.routes.js'

const route = express.Router();

route.get('/api', (req, res) => {
  res.send('home');
});

route.use('/api/scores', scoresRoutes);

export default route;
