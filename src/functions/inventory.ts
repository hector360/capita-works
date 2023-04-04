import * as XLSX from 'xlsx';
import * as fs from 'fs';
import csvParser from 'csv-parser';

/**
 * Retrieves inventory data from the first XLSX file found in the specified directory
 * and saves the selected columns as a JSON file.
 * @async
 * @function
 * @returns {Promise<void>} - A promise that resolves when the function is completed.
 * @throws {Error} - If an error occurs while reading the XLSX file or writing the JSON file.
 * @example
 * await getInventoryData();
 */

export const getInventoryData = async () => {
  const outputFilePath: string = './src/database/inventory.json';
  const columnsToConvert: string[] = ['vin', 'date_min', 'date_max', 'vehicle_year', 'vehicle_make', 'vehicle_model'];
  let xlsxFileName = await getFileName('./src/xlsxFiles')

  const workbook = XLSX.readFile('./src/xlsxFiles/' + xlsxFileName);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(worksheet) as Array<{ [key: string]: any }>;

  const jsonOutput = data.map(row => {
    const newRow: { [key: string]: any } = {};
    columnsToConvert.forEach(column => {
      newRow[column] = row[column];
    });
    return newRow;
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(jsonOutput, null, 2));

}

/**
 * Retrieves inventory data from the first CSV file found in the specified directory
 * and saves the selected columns as a JSON file.
 * @async
 * @function
 * @returns {Promise<void>} - A promise that resolves when the function is completed.
 * @throws {Error} - If an error occurs while reading the CSV file or writing the JSON file.
 * @example
 * await getInventoryDataFromCsv();
 */

export const getInventoryDataFromCsv = async () => {
  const outputFilePath: string = './src/database/inventory.json';
  const columnsToConvert: string[] = ['vin', 'date_min', 'date_max', 'vehicle_year', 'vehicle_make', 'vehicle_model'];
  let xlsxFileName = await getFileName('./src/xlsxFiles')

  const workbook = XLSX.readFile('./src/xlsxFiles/' + xlsxFileName);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(worksheet) as Array<{ [key: string]: any }>;

  const jsonOutput = data.map(row => {
    const newRow: { [key: string]: any } = {};
    columnsToConvert.forEach(column => {
      newRow[column] = row[column];
    });
    return newRow;
  });

  fs.writeFileSync(outputFilePath, JSON.stringify(jsonOutput, null, 2));

}

/**
 * Retrieves sheet names from a specific XLSX file.
 * @function
 * @returns {Array<string>} - An array of sheet names in the XLSX file.
 * @throws {Error} - If an error occurs while reading the XLSX file.
 * @example
 * const sheetNames = getSheetNames();
 */
export const getSheetNames = async() => {
  let fileName = await getFileName('./src/xlsxFiles')
  const workbook = XLSX.readFile(`./src/xlsxFiles/${fileName}`);
  const sheetNames = workbook.SheetNames;
  return sheetNames;

}

/**
 * Converts an XLSX file to a CSV file.
 * @async
 * @function
 * @param {string} inputFilePath - The input file path of the XLSX file to be converted.
 * @returns {Promise<void>} - A promise that resolves when the conversion is completed.
 * @throws {Error} - If an error occurs during the conversion process.
 * @example
 * await convertXlsxFile('./src/xlsxFiles/sample.xlsx');
 */

export const convertXlsxFile = async (inputFilePath: string) => {
  try {

    const workbook = XLSX.readFile(inputFilePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // convert the sheet to a CSV string
    const csvString = XLSX.utils.sheet_to_csv(sheet, { blankrows: false });

    // write the CSV string to a file
    let csvFileName = 'output_file.csv';
    await fs.writeFileSync(`./src/csvFiles/${csvFileName}`, csvString);

  } catch (error) {
    console.log(error)
  }
}

interface CsvRow {
  vin?: string,
  date_min?: Date,
  date_max?: Date,
  listing_stock?: string,
  listing_price?: number,
  listing_type?: string,
  listing_mileage?: number,
  vehicle_year?: number,
  vehicle_make?: string,
  vehicle_model?: string,
  vehicle_trim?: string,
  vehicle_style?: string,
  vehicle_color_exterior?: string,
  vehicle_color_interior?: string,
  listing_vdp_url?: string,
  vehicle_dealer_attribution_score?: number,
  vehicle_dealer_attribution_level?: number,
  listing_description?: string,
  listing_features?: string,
  vehicle_title?: string,
  vehicle_subtitle?: string,
  vehicle_type?: string,
  vehicle_truck_cab_style?: string,
  vehicle_truck_bed_style?: string,
  vehicle_engine?: string,
  vehicle_engine_size?: number,
  vehicle_engine_cylinders?: number,
  vehicle_transmission?: string,
  vehicle_transmission_type?: string,
  vehicle_transmission_speed?: number,
  vehicle_drivetrain?: string,
  vehicle_doors?: string,
  vehicle_fuel_type?: string,
  vehicle_fuel_efficiency?: string,
  vehicle_fuel_efficiency_highway?: string,
  vehicle_fuel_efficiency_city?: string,
  certified_preowned_flag?: number,
  va_seller_id?: string,
  va_seller_name?: string,
  va_seller_address?: string,
  va_seller_city?: string,
  va_seller_state?: string,
  va_seller_zip?: string,
  va_seller_country?: string,
  va_seller_websites?: string,
  va_seller_domains?: string,
  va_seller_phones?: string,
  va_seller_type?: string,
  va_seller_makes?: string,
  va_seller_latitude?: number,
  va_seller_longitude?: number,

}

/**
 * Converts a CSV file to a JSON file and updates the JSON file with the new data.
 * @async
 * @function
 * @returns {Promise<void>} - A promise that resolves when the conversion and update are completed.
 * @throws {Error} - If an error occurs during the conversion process or file access.
 * @example
 * await convertCsvToJson();
 */

export const convertCsvToJson = async () => {
  try {
    let csvFileName = await getFileName('./src/csvFiles')
    const inputFilePath = `./src/csvFiles/${csvFileName}`;
    const outputFilePath = './src/database/inventory.json';

    const fileExists = await fileExistsSync(inputFilePath);

    if (fileExists) {
      fs.access(outputFilePath, fs.constants.F_OK, async (err) => {
        let jsonArray: CsvRow[] = [];

        if (!err) {
          const jsonData = fs.readFileSync(outputFilePath, 'utf8');
          try {
            jsonArray = JSON.parse(jsonData);
          } catch (e) {
            console.error('Error parsing JSON data:', e);
            return;
          }
        }

        fs.createReadStream(inputFilePath)
          .pipe(csvParser())
          .on('data', (row: CsvRow) => {
            jsonArray.push(row);
          })
          .on('end', () => {
            fs.writeFileSync(outputFilePath, JSON.stringify(jsonArray, null, 2));

            console.log('JSON file updated successfully');
          });
        let csvFileName = await getFileName('./src/csvFiles')
        deleteFile(`./src/csvFiles/${csvFileName}`);
      });


    } else {
      console.log("The input file does not exist");
    }
  } catch (error) {
    console.log(error);
  }
};

/**
* Retrieves the first file name from the specified directory.
* @async
* @function
* @param {string} directory - The directory to look for files in.
* @returns {Promise<string>} - A promise that resolves to the first file name in the directory.
* @throws {Error} - If an error occurs while reading the directory.
* @example
* const fileName = await getFileName('./src/xlsxFiles');
*/
export const getFileName = async (directory: string) => {
  try {

    return new Promise((resolve, reject) => {
      fs.readdir(directory, (err, files) => {
        if (err) {
          console.error('Error reading directory:', err);
          reject(err);
        } else {
          resolve(files[0]);
        }
      });
    });


  } catch (error) {
    console.log(error)
  }
}

/**
 * Checks if a file exists at the given file path.
 * @function
 * @param {string} filePath - The file path to check.
 * @returns {boolean} - Returns true if the file exists, false otherwise.
 * @example
 * const exists = fileExistsSync('./path/to/your/file.txt');
 */

export const fileExistsSync = (filePath: string): boolean => {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * Deletes a file at the given file path.
 * @async
 * @function
 * @param {string} filePath - The file path to delete.
 * @returns {Promise<void>} - A promise that resolves when the file is deleted.
 * @throws {Error} - If an error occurs while deleting the file.
 * @example
 * await deleteFile('./path/to/your/file.txt');
 */
export const deleteFile = async (filePath: string): Promise<void> => {
  try {
    await fs.promises.unlink(filePath);
    console.log('File deleted successfully.');
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};