
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
        res.send(productos.slice(0, limit));

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        let pid = +req.params.pid;
        const producto = await productManager.getProductById(pid);

        if(!producto){
            return res.send({error: 'producto no encontrado'});
        }
        res.json(producto);

    } catch (err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const producto = req.body;
        const respuesta = await productManager.addProduct(producto);
        res.send('<script>alert("Producto añadido con éxito."); window.location.href = "/";</script>');
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


export default router;
