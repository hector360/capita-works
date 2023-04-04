import { app } from './app';
import cron from 'node-cron';
import { getInventoryData, convertCsvToJson } from './functions/inventory';

/**
 * Initializes and starts the Express application and a cron job.
 * The cron job executes every 5 minutes, converting CSV to JSON.
 * The Express app listens on port 3000.
 * @example
 * start();
 */
const start = async () => {
    const myTask = () => {
        console.log('executing cron');
        // getInventoryData()
        convertCsvToJson()
      };
      myTask()
    const task = cron.schedule('*/5 * * * *', myTask);
    task.start();
    app.listen(3000, () => {
        console.log('Listening to port 3000')
    })
}

start()