import { fetchScores } from "./scores.service.js";

export async function getCalifications(req, res) {
    try {
        const loginData = req.body;

        const califications = await fetchScores(loginData);
    
        res.status(200).json(califications);
    } catch (error) {
        console.error('Error fetching califications:', error);
        res.status(500).send('Error fetching califications');
    }
}
