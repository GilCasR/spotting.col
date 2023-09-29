import { Request, Response } from 'express';
import axios from 'axios';
import config from '../../config';

const getAirportData = async (req: Request, res: Response) => {
    const code: string = req.params.code
    try {
        const url: string = `https://airportdb.io/api/v1/airport/${code}?apiToken=${config.API_KEY}`        
        
        const response = await axios.get(url)
        res.status(200).json(response.data); // Use response.data to access the response body
    } catch (error) {
        res.status(400).json({ error: (error as Error).message });
    }
}

module.exports = { getAirportData }