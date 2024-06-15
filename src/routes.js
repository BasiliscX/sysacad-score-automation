import express from 'express';
import scoresRoutes from './features/scores/scores.routes.js'
// import loginRoutes from './features/login/login.routes';
// import calificationsRoutes from './features/califications/califications.routes';

const route = express.Router();

route.get('/api', (req, res) => {
  res.send('home');
});

// route.use('/api/login',loginRoutes);
route.use('/api/califications', scoresRoutes);

export default route;