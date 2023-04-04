import { Request, Response } from 'express';
import { getInventoryData, convertXlsxFile, getFileName } from '../functions/inventory';
import LocalJsonDB from '../functions/jsonDb';


/**
 * Converts an XLSX file to a CSV file and sends an HTTP response.
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Message} 200 - returns a message specifying that the file was converted from xlsx to csv
 * @throws {Error} - If an error occurs during the conversion process.
 * @example
 * router.post('/convert-xlsx-to-csv', convertXlsxToCsv);
 */
export const convertXlsxToCsv = async (req: Request, res: Response) => {
  try {
    let xlsxFileName = await getFileName('./src/xlsxFiles')
    await convertXlsxFile(`./src/xlsxFiles/${xlsxFileName}`)
    res.status(200).send("File converted from xlsx to CSV")
  }catch(error){
    res.status(500).send(error)
  }
}

/**
 * Retrieves inventory data, saves it to a JSON file, and sends an HTTP response.
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Message} 200 - returns message saying that the data was saved in the database
 * @throws {Error} - If an error occurs during the retrieval or saving process.
 * @example
 * router.post('/save-json-data', saveJsonData);
 */
export const saveJsonData = async (req: Request, res: Response) => {
  try {
    await getInventoryData()
    res.status(200).json({ response: "Data save in the database (json file)" })
  } catch(error) {
    res.status(500).send(error)
  }
  
}

/**
 * Retrieves inventory data based on a set of query parameters and sends an HTTP response with the filtered results.
 * @async
 * @function
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @returns {Object} - returns an object with all the parameters that were passed in the url and the total number of vehicles sold
 * @throws {Error} - If an error occurs during the retrieval or filtering process.
 * @example
 * router.get('/inventory', getInventory);
 */
export const getInventory = async (req: Request, res: Response) => {
  
  try{
    const localJsonDB = new LocalJsonDB('./src/database/inventory.json');
    const query = { 
      vin: req.query.vin,
      date_min: req.query.date_min,
      date_max: req.query.date_max,
    listing_stock: req.query.listing_stock,
    listing_price: req.query.listing_price,
    listing_type: req.query.listing_type,
    listing_mileage: req.query.listing_mileage,
    vehicle_year: req.query.vehicle_year,
    vehicle_make: req.query.vehicle_make,
    vehicle_model: req.query.vehicle_model,
    vehicle_trim: req.query.vehicle_trim,
    vehicle_style: req.query.vehicle_style,
    vehicle_color_exterior: req.query.vehicle_color_exterior,
    vehicle_color_interior: req.query.vehicle_color_interior,
    listing_vdp_url: req.query.listing_vdp_url,
    vehicle_dealer_attribution_score: req.query.vehicle_dealer_attribution_score,
    vehicle_dealer_attribution_level: req.query.vehicle_dealer_attribution_level,
    listing_description: req.query.listing_description,
    listing_features: req.query.listing_features,
    vehicle_title: req.query.vehicle_title,
    vehicle_subtitle: req.query.vehicle_subtitle,
    vehicle_type: req.query.vehicle_type,
    vehicle_truck_cab_style: req.query.vehicle_truck_cab_style,
    vehicle_truck_bed_style: req.query.vehicle_truck_bed_style,
    vehicle_engine: req.query.vehicle_engine,
    vehicle_engine_size: req.query.vehicle_engine_size,
    vehicle_engine_cylinders: req.query.vehicle_engine_cylinders,
    vehicle_transmission: req.query.vehicle_transmission,
    vehicle_transmission_type: req.query.vehicle_transmission_type,
    vehicle_transmission_speed: req.query.vehicle_transmission_speed,
    vehicle_drivetrain: req.query.vehicle_drivetrain,
    vehicle_doors: req.query.vehicle_doors,
    vehicle_fuel_type: req.query.vehicle_fuel_type,
    vehicle_fuel_efficiency: req.query.vehicle_fuel_efficiency,
    vehicle_fuel_efficiency_highway: req.query.vehicle_fuel_efficiency_highway,
    vehicle_fuel_efficiency_city: req.query.vehicle_fuel_efficiency_city,
    certified_preowned_flag: req.query.certified_preowned_flag,
    va_seller_id: req.query.va_seller_id,
    va_seller_name: req.query.va_seller_name,
    va_seller_address: req.query.va_seller_address,
    va_seller_city: req.query.va_seller_city,
    va_seller_state: req.query.va_seller_state,
    va_seller_zip: req.query.va_seller_zip,
    va_seller_country: req.query.va_seller_country,
    va_seller_websites: req.query.va_seller_websites,
    va_seller_domains: req.query.va_seller_domains,
    va_seller_phones: req.query.va_seller_phones,
    va_seller_type: req.query.va_seller_type,
    va_seller_makes: req.query.va_seller_makes,
    va_seller_latitude: req.query.va_seller_latitude,
    va_seller_longitude: req.query.va_seller_longitude
    };
    const filteredQuery = Object.fromEntries(
      Object.entries(query).filter(([key, value]) => {
        if (typeof value === 'string') {
          return value !== undefined && value !== '';
        }
        return value !== undefined;
      })
    );

    const results = localJsonDB.find(filteredQuery);

    let finalResponse: any = { ...filteredQuery}
    finalResponse.total_sold_vehicles = results.length;
    return res.status(200).json(finalResponse)
  } catch(error) {
    return res.status(500).send(error)
  }
}


