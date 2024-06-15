import express from 'express';
import Routes from './src/routes.js';
import bodyParser from 'body-parser'

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/', Routes);

app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
