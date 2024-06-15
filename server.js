import express from 'express';
import { fetchScores } from './src/features/scores/scores.service.js';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes POST
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Ruta para la API
app.post('/api/scores', async (req, res) => {
    const { facultad, legajo, password } = req.body;

    try {
        const scores = await fetchScores({ facultad, legajo, password });
        res.json(scores);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
