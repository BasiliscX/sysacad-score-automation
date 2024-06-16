import express from 'express';
import Routes from './src/routes.js';
import bodyParser from 'body-parser';
import { fetchScores } from './src/features/scores/scores.service.js'; // Import fetchScores if not defined elsewhere

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware to set request timeout
app.use((req, res, next) => {
    res.setTimeout(120000, () => {
        res.status(408).send('Request timeout');
    });
    next();
});

// Use defined routes
app.use('/', Routes);

// Serve static files from the 'public' directory
app.use(express.static('public'));

/**
 * POST route for fetching scores.
 * Expects a JSON body with 'facultad', 'legajo', and 'password' fields.
 * @name /api/scores
 * @function
 * @memberof module:server
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
app.post('/api/scores', async (req, res) => {
    const { facultad, legajo, password } = req.body;

    try {
        // Fetch scores using the provided login data
        const scores = await fetchScores({ facultad, legajo, password });
        res.json(scores);
    } catch (error) {
        // Handle errors and send a 500 status with the error message
        res.status(500).send(error.message);
    }
});

/**
 * GET route for the main page.
 * Serves the 'index.html' file from the 'public' directory.
 * @name /
 * @function
 * @memberof module:server
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
