
import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const router = Router();

const productManager = new ProductManager('./src/productos.json');

router.get('/', async (req, res) => {
    try {
        const productos = await productManager.getProducts();
        
        const limit = req.query.limit;
        if(!limit || limit < 1){
            return res.json(productos);
        }
        res.json(productos.slice(0, limit));

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        let pid = +req.params.pid;
        const producto = await productManager.getProductById(pid);

        if(!producto){
            return res.json({error: 'producto no encontrado'});
        }
        res.json(producto);

    } catch (err) {
        console.log(err);
    }
});


export default router;
