// Archivo: carrito.js
import { productosIniciales } from './data.js';

let productos = [];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const cartList = document.getElementById('cart-list');
const totalElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');

// Función de inicialización
function inicializarProductos() {
    const productosGuardados = localStorage.getItem('productos');
    if (!productosGuardados) {
        localStorage.setItem('productos', JSON.stringify(productosIniciales));
        productos = productosIniciales;
    } else {
        productos = JSON.parse(productosGuardados);
    }
}

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;

    const item = carrito.find(i => i.id === id);

    if (item) {
        item.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();
}

// Disminuir cantidad
function disminuirCantidad(id) {
    const item = carrito.find(i => i.id === id);
    if (item) {
        item.cantidad -= 1;
        if (item.cantidad <= 0) {
            carrito = carrito.filter(i => i.id !== id);
        }
        guardarCarrito();
        mostrarCarrito();
    }
}

// Eliminar del carrito
function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    guardarCarrito();
    mostrarCarrito();
}

// Vaciar carrito completamente
function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}

// Guardar en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar carrito
function mostrarCarrito() {
    if (!cartList || !totalElement || !cartCountElement) return;

    cartList.innerHTML = '';
    let totalItems = 0;

    if (carrito.length === 0) {
        cartList.innerHTML = '<p class="text-center">El carrito está vacío.</p>';
        cartCountElement.textContent = '0';
        totalElement.textContent = '$0';
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item d-flex justify-content-between align-items-center border-bottom py-3';
        div.innerHTML = `
            <div class="d-flex align-items-center">
                <img src="img/${item.imagen}" alt="${item.nombre}" style="width: 80px; height: 80px; margin-right: 15px; border: 1px solid #c0c0c0;">
                <div>
                    <strong>${item.nombre}</strong><br>
                    <small>${item.descripcion}</small>
                </div>
            </div>
            <div class="text-end">
                <span class="fw-bold">$${item.precio * item.cantidad}</span><br>
                <div class="input-group input-group-sm mt-2">
                    <button class="btn btn-outline-secondary" onclick="disminuirCantidad('${item.id}')">-</button>
                    <input type="text" class="form-control text-center" value="${item.cantidad}" readonly style="width: 30px;">
                    <button class="btn btn-outline-secondary" onclick="agregarAlCarrito('${item.id}')">+</button>
                </div>
            </div>
        `;
        cartList.appendChild(div);
        totalItems += item.cantidad;
    });

    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    totalElement.textContent = `$${total}`;
    cartCountElement.textContent = totalItems;
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    inicializarProductos();
    mostrarCarrito();
});

// Expone las funciones al ámbito global para que sean accesibles desde el HTML
window.agregarAlCarrito = agregarAlCarrito;
window.disminuirCantidad = disminuirCantidad;
window.eliminarDelCarrito = eliminarDelCarrito;
window.vaciarCarrito = vaciarCarrito;