
import fs from 'fs';

class ProductManager {

    constructor(path) {
        this.path = path;
        this.arrayPropiedades = ['title', 'description', 
        'price', 'thumbnail', 'code', 'stock', 'status', 
        'category'];
    }

    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const productos = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(productos);
            } else {
                return [];
            }

        } catch (error) {
            return error;
        }
    }  

    formateandoProducto (objeto) {
        let validObject = {};

        for (const propiedad in objeto) {
            if (this.arrayPropiedades.includes(propiedad)) {
                validObject[propiedad] = objeto[propiedad];
            } else {
                console.log(`Propiedad inválida: ${propiedad}, valor: ${objeto[propiedad]}`);
            }
        }

        if(!validObject.hasOwnProperty('status') || typeof validObject.status !== 'boolean'){
            validObject.status = true;
        }
        if(!validObject.hasOwnProperty('thumbnail')){
            validObject.thumbnail = '';
        }

        //convertir los valores numericos a numeros
        validObject.price = parseFloat(validObject.price);
        validObject.stock = parseFloat(validObject.stock);

        return validObject;
    };

    checkProduct(producto) {
        if (producto.hasOwnProperty('title') && typeof producto.title === 'string' &&
            producto.hasOwnProperty('description') && typeof producto.description === 'string' &&
            producto.hasOwnProperty('price') && typeof producto.price === 'number' &&
            producto.hasOwnProperty('thumbnail') && typeof producto.thumbnail === 'string' &&
            producto.hasOwnProperty('code') && typeof producto.code === 'string' &&
            producto.hasOwnProperty('stock') && typeof producto.stock === 'number' &&
            producto.hasOwnProperty('status') && typeof producto.status === 'boolean' &&
            producto.hasOwnProperty('category') && typeof producto.category === 'string'
            ) {
            return true;
        } else {
            return false;
        }
    }

    async addProduct(producto) {
        try {
            const newProduct = this.formateandoProducto(producto);
            if (this.checkProduct(newProduct)) {
                const productos = await this.getProducts();

                if (productos.find(p => p.code === newProduct.code)) {
                    return 'Codigo existente';
                } else {

                    let id;
                    if (productos.length === 0) {
                        id = 1;
                    } else {
                        id = productos[productos.length - 1].id + 1;
                    }

                    productos.push({ ...newProduct, id });
                    const jsonProductos = JSON.stringify(productos);
                    await fs.promises.writeFile(this.path, jsonProductos, 'utf-8');

                    return 'Producto agregado correctamente';
                }
                

            } else {
                return newProduct;
            }

        } catch (error) {
            return error;
        }
    }

    async getProductById(id) {
        try {
            const productos = await this.getProducts();
            const producto = productos.find(p => p.id === id);

            if (!producto) {
                return;
            } else {
                return producto;
            }

        } catch (error) {
            return error;
        }
    }

    async updateProductById(id, producto) {
        try {
            if (this.checkProduct(producto)) {
                const productos = await this.getProducts();
                const indice = productos.findIndex(p => p.id === id);

                if (indice === -1) {
                    return 'Producto no encontrado';
                } else {
                    productos[indice] = { ...producto, id };
                    const jsonProductos = JSON.stringify(productos);

                    await fs.promises.writeFile(this.path, jsonProductos, 'utf-8');
                    return 'Producto actualizado correctamente';
                }
            }

        } catch (error) {
            return error;
        }
    }

    async deleteProductById(id) {
        try {
            const productos = await this.getProducts();
            const indice = productos.findIndex(p => p.id === id);

            if (indice === -1) {
                return 'Producto no encontrado por su id';
            } else {
                productos.splice(indice, 1);
                const jsonProductos = JSON.stringify(productos);
                await fs.promises.writeFile(this.path, jsonProductos, 'utf-8');
                return 'Producto eliminado correctamente mediante su id';
            }

        } catch (error) {
            return error;
        }
    }

    async deleteProductByCode(code){
        try{
            const productos = await this.getProducts();
            const indice = productos.findIndex(p => p.code === code);

            if(indice === -1){
                return 'Producto no encontrado por su codigo';
            } else{
                productos.splice(indice,1);
                const jsonProductos = JSON.stringify(productos);
                await fs.promises.writeFile(this.path, jsonProductos, 'utf-8');
                return 'Producto eliminado correctamente mediante su codigo';
            }

        } catch (error){
            return error;
        }
    }

}

export default ProductManager;
