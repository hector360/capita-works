import express from 'express';
import { json } from 'body-parser';
import { inventoryRouter } from './routes/inventory';

const app = express();

app.set('trust proxy', true);
app.use(json());
app.use(inventoryRouter)



export { app };