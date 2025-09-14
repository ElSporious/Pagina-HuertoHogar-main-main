// Archivo: js/cat_producto.js

import { productosIniciales } from './data.js';

let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const contenedorProductos = document.getElementById('contenedor-productos');
const categoriaDescripcion = document.getElementById('categoria-descripcion');
const cartCountElement = document.getElementById('cart-count');

function inicializarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (!productosGuardados) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
        productos = productosIniciales;
    } else {
        productos = JSON.parse(productosGuardados);
    }
}

// Función principal para mostrar los productos
export function mostrarProductos(categoria) {
    if (!contenedorProductos) return;

    // Detectar si estamos en la página de productos.html
    const esPaginaProductos = window.location.pathname.endsWith('productos.html');

    let productosFiltrados = productos;
    let titulo = "Todos los Productos";
    let descripcion = "Descubre nuestra selección completa de productos frescos y de calidad.";

    if (categoria && categoria !== 'todos') {
        productosFiltrados = productos.filter(p => p.categoria === categoria);
        titulo = categoria;
        descripcion = `Explora nuestra variedad de ${categoria.toLowerCase()}.`;
    }

    if (categoriaDescripcion) {
        categoriaDescripcion.querySelector('h2').textContent = titulo;
        categoriaDescripcion.querySelector('p').textContent = descripcion;
    }

    contenedorProductos.innerHTML = '';
    
    if (productosFiltrados.length === 0) {
        contenedorProductos.innerHTML = '<p class="text-center">No hay productos disponibles en esta categoría.</p>';
    } else {
        productosFiltrados.forEach(producto => {
            const productCard = document.createElement('div');
            productCard.className = 'col-md-3 mb-4';
            
            // Lógica para el enlace de la imagen y el botón de "Añadir"
            const linkImagen = esPaginaProductos 
                ? `onclick="window.location.href='detalle_producto.html?id=${producto.id}'"`
                : '';
            
            const botonAnadir = esPaginaProductos 
                ? `<button onclick="agregarAlCarrito(event, ${producto.id})">Añadir</button>`
                : '';

            productCard.innerHTML = `
                <div class="card h-100">
                    <img src="img/${producto.imagen}" class="card-img-top tamano_img" alt="${producto.nombre}" ${linkImagen}>
                    <div class="card-body d-flex flex-column">
                        <h5 class="titulo">${producto.nombre}</h5>
                        <p class="desc_prod_text_sec">${producto.categoria}</p>
                        <p class="desc_prod_text_sec">${producto.descripcion}</p>
                        <p class="desc_prod_text_sec card-text mt-auto"><strong>$${producto.precio} CLP</strong></p>
                        ${botonAnadir}
                    </div>
                </div>
            `;
            contenedorProductos.appendChild(productCard);
        });
    }
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

window.productosPorCategoria = mostrarProductos;
window.agregarAlCarrito = agregarAlCarrito;

document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos();
    actualizarContadorCarrito();
    
    // Al cargar la página, muestra los productos de acuerdo a la URL
    if (window.location.pathname.endsWith('productos.html')) {
        // En la página de productos, muestra todo con el botón y el enlace
        mostrarProductos('todos');
    } else {
        // En cualquier otra página (como index.html), muestra todo sin el botón ni el enlace
        mostrarProductos('todos');
    }
});