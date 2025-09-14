// Archivo: productos.js
import { productosIniciales } from './data.js';

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const productListContainer = document.getElementById('product-list-container');
const cartCountElement = document.getElementById('cart-count');

let productos = [];

function inicializarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (!productosGuardados) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
        productos = productosIniciales;
    } else {
        productos = JSON.parse(productosGuardados);
    }
}

function mostrarProductos() {
    if (!productListContainer) return;
    productListContainer.innerHTML = '';
    productos.forEach(producto => {
        const productCard = document.createElement('div');
        productCard.className = 'col-md-3 mb-4';
        productCard.innerHTML = `
            <div class="card h-100">
                <img src="img/${producto.imagen}" class="card-img-top tamano_img" alt="${producto.nombre}" onclick="window.location.href='detalle_producto.html?id=${producto.id}'">
                <div class="card-body d-flex flex-column">
                    <h5 class="titulo">${producto.nombre}</h5>
                    <p class="desc_prod_text_sec">${producto.categoria}</p>
                    <p class="desc_prod_text_sec">${producto.descripcion}</p>
                    <p class="desc_prod_text_sec card-text mt-auto"><strong>$${producto.precio} CLP</strong></p>
                    <button onclick="agregarAlCarrito(event, '${producto.id}')">Añadir</button>
                </div>
            </div>
        `;
        productListContainer.appendChild(productCard);
    });
}

function agregarAlCarrito(e, id) {
    e.stopPropagation();

    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const item = carrito.find(i => i.id === id);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    actualizarContadorCarrito();
    alert(`${producto.nombre} agregado al carrito.`);
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
    if (!cartCountElement) return;
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCountElement.textContent = totalItems;
}

function productosPorCategoria(categoriaSeleccionada) {
    const productosFiltrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
    return productosFiltrados;
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos();
    mostrarProductos();
    actualizarContadorCarrito();
});

// Agregamos la función al ámbito global para que sea accesible desde el HTML
window.agregarAlCarrito = agregarAlCarrito;