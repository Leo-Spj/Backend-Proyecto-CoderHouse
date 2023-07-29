
import express from 'express';
import { __dirname } from './utils.js';

import productsRouter from './routers/products.router.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('src/public'));

app.use('/api/products', productsRouter);



const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${PORT}`);
});