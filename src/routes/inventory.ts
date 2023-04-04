
import express from 'express';
import { getInventory, saveJsonData, convertXlsxToCsv } from '../controllers/inventoryController';
import { saveJsonDataFromCsv } from '../controllers/inventoryCsvController';
/**
 * Express router for managing inventory-related requests.
 * @class
 */
const router = express.Router();

/**
 * Route to save JSON data to a JSON file (database).
 * @route GET /save-json-data
 * @returns {Message} 200 - Returns a message specifying that data has been saved to a JSON file (database).
 * @returns {Error} 500 - Internal server error.
 */
router.get('/save-json-data', saveJsonData);

/**
 * Route to get inventory data based on the specified query parameters.
 * @route GET /get-inventory-data
 * @returns {Object<Inventory>} 200 - Returns an object with all the parameters that were passed in the URL and the total number of vehicles sold.
 * @returns {Error} 500 - Internal server error.
 */
router.get('/get-inventory-data', getInventory);

/**
 * Route to convert an XLSX file to a CSV file.
 * @route GET /convert-xlsx-to-csv
 * @returns {Message} 200 - Returns a message specifying that the file was converted from XLSX to CSV.
 * @returns {Error} 500 - Internal server error.
 */
router.get('/convert-xlsx-to-csv', convertXlsxToCsv);

/**
 * Route to save JSON data from a CSV file to a JSON file (database).
 * @route GET /save-json-data-from-csv
 * @returns {Message} 200 - Returns a message specifying that the data has been saved from a CSV file to a JSON file (database).
 * @returns {Error} 500 - Internal server error.
 */
router.get('/save-json-data-from-csv', saveJsonDataFromCsv);

export { router as inventoryRouter }