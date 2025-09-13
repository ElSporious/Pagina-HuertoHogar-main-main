const productos = [
  { id: 1, nombre: "Manzanas Fuji", descripcion: "Manzanas Fuji crujientes y dulces, cultivadas en el Valle del Maule.", precio: 1200, imagen: "Manzana.PNG", categoria:"Frutas"},
  { id: 2, nombre: "Naranjas Valencia", descripcion: "Jugosas y ricas en vitamina C, ideales para zumos frescos y refrescantes.", precio: 1000, imagen: "Naranjajajajjaja.PNG", categoria:"Frutas" },
  { id: 3, nombre: "Plátanos Cavendish", descripcion: "Plátanos maduros y dulces, perfectos como snack energético.", precio: 800, imagen: "Banana.png", categoria:"Frutas"},
  { id: 4, nombre: "Zanahorias Orgánicas", descripcion: "Zanahorias crujientes cultivadas sin pesticidas.", precio: 900, imagen: "Zanahoria.PNG", categoria:"Verdura Organicas"},
  { id: 5, nombre: "Espinacas Frescas", descripcion: "Espinacas frescas y nutritivas, para ensaladas y batidos verdes.", precio: 700, imagen: "Espinaca.png", categoria:"Verdura Organicas" },
  { id: 6, nombre: "Pimientos Tricolores", descripcion: "Pimientos rojos, amarillos y verdes, ideales para platos coloridos.", precio: 1500, imagen: "Pimenton.PNG", categoria:"Verdura Organicas"},
  { id: 7, nombre: "Miel Orgánica", descripcion: "Miel pura y orgánica producida por apicultores locales.", precio: 900000, imagen: "Miel.png", categoria:"Productos Organicos"},
  { id: 8, nombre: "Quinua Orgánica", descripcion: "Quinua andina, superalimento rico en proteínas y fibra.", precio: 800, imagen: "Quinoa.png", categoria:"Productos Organicos" },
  { id: 9, nombre: "Leche Entera", descripcion: "Leche fresca de granjas locales, producción responsable.", precio: 2700, imagen: "Leche.png", categoria:"Productos Lacteos"},
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtiene el ID del producto de la URL
    const params = new URLSearchParams(window.location.search);
    const productoId = parseInt(params.get('id'));

    let producto;
    // 2. Si el ID existe, busca el producto en tu lista
    if (productoId) {
        producto = productos.find(p => p.id === productoId);
    }

    // 3. Si no se encuentra un ID o un producto válido, muestra el primer producto por defecto
    if (!producto) {
        producto = productos[0];
    }
    
    // Ahora, renderiza el producto encontrado
    renderProducto(producto);
});

function renderProducto(producto) {
  document.getElementById('ruta_nav').innerHTML = `
      <a class="enlaces" href="productos.html">${producto.categoria}</a> &gt; <span>${producto.nombre}</span>
  `;

  document.getElementById('mainImage').src = `img/${producto.imagen}`;
  document.getElementById('mainImage').alt = producto.nombre;
  document.getElementById('nombreProducto').textContent = producto.nombre;
  document.getElementById('precioProducto').textContent = `$${producto.precio}`;
  document.getElementById('descripcionProducto').textContent = producto.descripcion;

  // Miniaturas
  const thumbnails = document.getElementById('thumbnails');
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

  // Productos relacionados
  const relacionados = productos.filter(p => p.categoria === producto.categoria && p.id !== producto.id);
  const relContainer = document.getElementById('relacionados');
  relContainer.innerHTML = '';

  relacionados.forEach(p => {
    const img = document.createElement('img');
    img.src = `img/${p.imagen}`;
    img.className = 'img-thumbnail';
    img.style.width = '120px';
    img.alt = p.nombre;

    // ✅ Click en imagen relacionada: actualiza producto
    img.onclick = () => {
      renderProducto(p);
      document.getElementById('productoSelect').value = p.id; // actualiza el select
    };

    relContainer.appendChild(img);
  });

  // Guardamos el producto actual para el carrito
  window.productoActual = producto;
}

// La función addToCart() debe lucir así en tu archivo detalle_producto.js
function addToCart() {
  // Obtiene la cantidad del input y el producto de la variable global
  const cantidad = parseInt(document.getElementById('cantidad').value);
  const producto = window.productoActual;

  if (producto) {
    // 1. Obtiene el carrito del localStorage o crea uno vacío si no existe.
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // 2. Busca si el producto ya está en el carrito
    const itemEnCarrito = carrito.find(item => item.id === producto.id);

    if (itemEnCarrito) {
      // 3. Si el producto ya existe, suma la nueva cantidad
      itemEnCarrito.cantidad += cantidad;
    } else {
      // 4. Si es un producto nuevo, lo agrega al carrito con la cantidad.
      carrito.push({ ...producto, cantidad: cantidad });
    }

    // 5. Guarda el carrito actualizado en el localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // 6. Actualiza el contador del carrito en el encabezado
    const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
      cartCountElement.textContent = totalItems;
    }

    // Mensaje de confirmación para el usuario
    alert(`Has añadido ${cantidad} unidad(es) de ${producto.nombre} al carrito.`);
  }
}