import { fetchScores } from "./scores.service.js";

/**
 * Controller function to handle the request for fetching califications (scores).
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The body of the request containing login data.
 * @param {string} req.body.facultad - The faculty to select.
 * @param {string} req.body.legajo - The student's ID number.
 * @param {string} req.body.password - The student's password.
 * @param {Object} res - Express response object.
 */
export async function getCalifications(req, res) {
    try {
        // Extract login data from the request body
        const loginData = req.body;

        // Fetch the califications (scores) using the provided login data
        const califications = await fetchScores(loginData);
    
        // Send the fetched califications as a JSON response
        res.status(200).json(califications);
    } catch (error) {
        // Log the error to the console
        console.error('Error fetching califications:', error);
        
        // Send an error response with status 500
        res.status(500).send('Error fetching califications');
    }
}
