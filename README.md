# Backend-Proyecto-CoderHouse

## Requisitos

- Node.JS

- Tener instalado globalmente nodemon:

```bash
npm install -g nodemon
```
- Postman o similar para probar los endpoints.

## Instalación

Instalar las dependencias del proyecto desde la raíz:

```bash
npm install
```

Correr el servidor con nodemon:

```bash
npm start
```



## Endpoints - Productos


### GET /api/products

Retorna un array con todos los productos disponibles.

### GET /api/products/:id

Retorna el producto con el id especificado.

### GET /api/products?limit=4

Retorna un array con los primeros 4 productos.

### POST /api/products

Crea un nuevo producto.

El `body` debe contener los siguientes campos: 
| Campo | Tipo | Requerimiento |
| ------ | ------ | ------ |
| title | string | obligatorio |
| description | string | obligatorio |
| price | number | obligatorio |
| thumbnail | string | opcional |
| code | string | obligatorio |
| stock | number | obligatorio |
| status | boolean | default: TRUE |
| category | string | obligatorio |

### PUT /api/products/:id

Actualiza el producto con el id especificado.

El `body` debe contener alguno de los campos mencionados en el endpoint anterior.

### DELETE /api/products/:id

Elimina el producto con el id especificado.



## Endpoints - Carrito


### POST /api/carts

Crea un nuevo carrito.

El `body` debe estar vacío.

### GET /api/carts

Retorna un array con todos los carritos.

### GET /api/carts/:cid

Retorna el carrito con el id especificado.

### POST /api/carts/:cid/product/:pid

Agrega un producto al carrito (codigo "cid") con el id del producto especificado (codigo "pid").

El `body` debe estar vacío.




