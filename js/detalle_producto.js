// Archivo: detalle_producto.js
import { productosIniciales } from './data.js';

let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function inicializarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (!productosGuardados) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
        productos = productosIniciales;
    } else {
        productos = JSON.parse(productosGuardados);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos();
    actualizarContadorCarrito();

    // Obtiene el ID del producto de la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = params.get('id');

    let producto;
    // Busca el producto en tu lista
    if (productoId) {
        producto = productos.find(p => p.id === productoId);
    }

    // Si no se encuentra un ID, muestra el primer producto por defecto
    if (!producto) {
        producto = productos[0];
    }
    
    // Renderiza el producto
    if (producto) {
        renderProducto(producto);
    }
});

function renderProducto(producto) {
    document.getElementById('ruta_nav').innerHTML = `
        <a class="enlaces" href="productos.html">${producto.categoria}</a> &gt; <span>${producto.nombre}</span>
    `;

    document.getElementById('mainImage').src = `img/${producto.imagen}`;
    document.getElementById('mainImage').alt = producto.nombre;
    document.getElementById('nombreProducto').textContent = producto.nombre;
    document.getElementById('precioProducto').textContent = `$${producto.precio.toLocaleString('es-CL')}`;
    document.getElementById('descripcionProducto').textContent = producto.descripcion;

    // Miniaturas
    const thumbnails = document.getElementById('thumbnails');
    if (thumbnails) {
        thumbnails.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const img = document.createElement('img');
            img.src = `img/${producto.imagen}`;
            img.className = 'img-thumbnail me-2';
            img.style.width = '60px';
            img.alt = `Miniatura ${i+1}`;
            img.onclick = () => {
                document.getElementById('mainImage').src = img.src;
            };
            thumbnails.appendChild(img);
        }
    }

    // Productos relacionados
    const relacionados = productos.filter(p => p.categoria === producto.categoria && p.id !== producto.id);
    const relContainer = document.getElementById('relacionados');
    if (relContainer) {
        relContainer.innerHTML = '';
        relacionados.forEach(p => {
            const img = document.createElement('img');
            img.src = `img/${p.imagen}`;
            img.className = 'img-thumbnail';
            img.style.width = '120px';
            img.alt = p.nombre;
            img.onclick = () => {
                window.location.href = `detalle_producto.html?id=${p.id}`;
            };
            relContainer.appendChild(img);
        });
    }

    // Guarda el producto actual para que addToCart pueda acceder a él
    window.productoActual = producto;
}

// Función que se llama desde el botón "Añadir al carrito" en el HTML
function addToCart() {
    const cantidadInput = document.getElementById('cantidad');
    const cantidad = cantidadInput ? parseInt(cantidadInput.value) : 1;
    const producto = window.productoActual;

    if (!producto) {
        console.error('No hay un producto para añadir al carrito.');
        return;
    }

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const itemEnCarrito = carrito.find(item => item.id === producto.id);

    const cantidadEnCarrito = itemEnCarrito ? itemEnCarrito.cantidad : 0;
    const stockDisponible = producto.stock;
    const cantidadTotal = cantidadEnCarrito + cantidad;

    // Validación para no exceder el stock
    if (cantidadTotal > stockDisponible) {
        alert(`No hay suficiente stock. Solo quedan ${stockDisponible - cantidadEnCarrito} unidades disponibles de ${producto.nombre}.`);
        return;
    }

    if (itemEnCarrito) {
        itemEnCarrito.cantidad = cantidadTotal;
    } else {
        carrito.push({ ...producto, cantidad: cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
    alert(`Has añadido ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
}

function actualizarContadorCarrito() {
    const cartCountElement = document.getElementById('cart-count');
    if (!cartCountElement) return;
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    cartCountElement.textContent = totalItems;
}

// Hacemos la función global para que el HTML pueda llamarla
window.addToCart = addToCart;
window.actualizarContadorCarrito = actualizarContadorCarrito;