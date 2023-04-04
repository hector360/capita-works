import * as fs from 'fs';

interface Query {
    [key: string]: any;
}

/**
 * Class representing a local JSON database.
 * @class
 */

class LocalJsonDB {
    private filePath: string;
    /**
     * Create a new instance of the local JSON database.
     * @constructor
     * @param {string} filePath - The file path of the JSON file.
     */
    constructor(filePath: string) {
        this.filePath = filePath;
    }
    /**
  * Read the JSON file and return its contents as an array.
  * @private
  * @returns {Array<any>} - The contents of the JSON file as an array.
  * @throws {Error} - If an error occurs while reading the file.
  */

    private readJsonFile(): Array<any> {
        const rawData = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(rawData);
    }
    /**
       * Find records in the JSON file that match the given query.
       * @param {Query} query - The query object with key-value pairs to match.
       * @returns {Array<any>} - An array of records that match the query.
       */
    find(query: Query): Array<any> {
        const data = this.readJsonFile();

        return data.filter(record => {
            for (const key in query) {
                if (query.hasOwnProperty(key) && record[key] !== query[key]) {
                    return false;
                }
            }
            return true;
        });
    }
}

export default LocalJsonDB;