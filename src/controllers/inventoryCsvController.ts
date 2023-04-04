
import { Request, Response } from 'express';
import { getInventoryDataFromCsv, convertCsvToJson } from '../functions/inventory';

/**
 * Converts CSV data to JSON and saves it, then sends an HTTP response.
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Message} 200 - returns a message specifying that the Data was save
 * @throws {Error} - If an error occurs during the conversion process or saving data.
 * @example
 * router.post('/save-json-data-from-csv', saveJsonDataFromCsv);
 */
export const saveJsonDataFromCsv = async (req: Request, res: Response) => {
    try{
        // await getInventoryDataFromCsv()
        await convertCsvToJson()
        res.status(200).send("Data save from a CSV File")
    } catch(error) {
        res.status(500).send(error)
    }
    
}