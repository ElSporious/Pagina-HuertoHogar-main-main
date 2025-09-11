// Lista de productos predefinidos
const productos = [
    { id: 1, nombre: "Manzanas Fuji", descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.", precio: 1200, imagen: "Manzana.PNG", categoria:"Frutas"},
    { id: 2, nombre: "Naranjas Valencia", descripcion: "Jugosas y ricas en vitamina C, estas naranjas Valencia son ideales para zumos frescos y refrescantes.", precio: 1000, imagen: "Naranjajajajjaja.PNG", categoria:"Frutas" },
    { id: 3, nombre: "Plátanos Cavendish", descripcion: "Plátanos maduros y dulces, perfectos para el desayuno o como snack energético.", precio: 800, imagen: "Banana.png", categoria:"Frutas"},
    { id: 4, nombre: "Zanahorias Orgánicas", descripcion: "Zanahorias crujientes cultivadas sin pesticidas en la Región de O'Higgins.", precio: 900, imagen: "Zanahoria.PNG", categoria:"Verdura Organicas"},
    { id: 5, nombre: "Espinacas Frescas", descripcion: "Espinacas frescas y nutritivas, perfectas para ensaladas y batidos verdes.", precio: 700, imagen: "Espinaca.png", categoria:"Verdura Organicas" },
    { id: 6, nombre: "Pimientos Tricolores ", descripcion: "Pimientos rojos, amarillos y verdes, ideales para salteados y platos coloridos.", precio: 1500, imagen: "Pimenton.PNG", categoria:"Verdura Organicas"},
    { id: 7, nombre: "Miel Orgánica ", descripcion: "Miel pura y orgánica producida por apicultores locales.", precio: 900000, imagen: "Miel.png", categoria:"Productos Organicos"},
    { id: 8, nombre: "Quinua Orgánica ", descripcion: "Quinua andina, un superalimento rico en proteínas, fibra y minerales.", precio: 800, imagen: "Quinoa.png", categoria:"Productos Organicos" },
    { id: 9, nombre: "Leche Entera ", descripcion: "Leche fresca de granjas locales que se dedican a la producción responsable.", precio: 2700, imagen: "Leche.png", categoria:"Productos Lacteos"},
];
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

const cartList = document.getElementById('cart-list');
const totalElement = document.getElementById('total-price');
const cartCountElement = document.getElementById('cart-count');

// Agregar al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
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

// Mostrar carrito (¡Esta es la función modificada!)
function mostrarCarrito() {
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
                    <button class="btn btn-outline-secondary" onclick="disminuirCantidad(${item.id})">-</button>
                    <input type="text" class="form-control text-center" value="${item.cantidad}" readonly style="width: 30px;">
                    <button class="btn btn-outline-secondary" onclick="agregarAlCarrito(${item.id})">+</button>
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
mostrarCarrito();