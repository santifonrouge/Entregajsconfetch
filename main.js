// Obtener elementos del DOM
const carritoContainer = document.querySelector('.carrito-container');
const carritoLista = document.getElementById('carrito-lista');
const carritoTotal = document.getElementById('carrito-total');
const cantidadCarrito = document.getElementById('cantidad-carrito');
const cerrarCarritoBtn = document.getElementById('cerrar-carrito');
const mainContainer = document.getElementById("productos")

const productosJSON = [
    {
        id: 'producto1',
        nombre: 'Almendras',
        precio: 1800,
        cantidad: 0,
    },
    {
        id: 'producto2',
        nombre: 'Avena',
        precio: 600,
        cantidad: 0,
    },
    {
        id: 'producto3',
        nombre: 'Miel',
        precio: 900,
        cantidad: 0,             
    },
    {
        id: 'producto4',
        nombre: 'Pasta de Mani',
        precio: 1500,
        cantidad: 0,                                                        
    },
    {
        id: 'producto5',
        nombre: 'Hummus',
        precio: 900,
        cantidad: 0,
    },
    {
        id: 'producto6',
        nombre: 'Nueces',
        precio: 1500,
        cantidad: 0,
    },
    {
        id: 'producto7',
        nombre: 'Mix Frutos Secos',
        precio: 1600,
        cantidad: 0,
    },
    {
        id: 'producto8',
        nombre: 'Mani',
        precio: 700,
        cantidad: 0,
    },

];

// Obtener productos desde localStorage o usar un array vacío si no hay productos guardados
const productosEnCarrito = JSON.parse(localStorage.getItem('productosEnCarrito')) || [];

// Evento para abrir el carrito al hacer clic en el icono del carrito
const tarjetasProductos = document.querySelectorAll('.tarjeta');

tarjetasProductos.forEach(tarjeta => {
  const botonAgregar = tarjeta.querySelector(".bot");
  const idProducto = tarjeta.id;
  const nombreProducto = tarjeta.querySelector(".tarjeta_titulo h2").textContent;
  const precioProducto = parseInt(tarjeta.querySelector(".tarjeta_descripcion p").textContent.replace('Precio por kg: $', ''));

  botonAgregar.addEventListener('click', () => {
    const producto = {
      id: idProducto,
      nombre: nombreProducto,
      precio: precioProducto
    };
    agregarAlCarrito(producto);
  });
});

// Evento para abrir el carrito al hacer clic en el icono del carrito
const carritoIcono = document.querySelector('.carrito-icono');
carritoIcono.addEventListener('click', () => {
  carritoContainer.style.display = 'flex';
  mostrarProductosEnCarrito();
});

// Evento para cerrar el carrito al hacer clic en el botón "Cerrar"
cerrarCarritoBtn.addEventListener('click', () => {
  carritoContainer.style.display = 'none';
}); 

// Arreglo fetch
fetch("data.json")
  .then(response => response.json())
  .then(data => {
    const products = data.productos;
    // por cada producto se crea un div class = "productCont"
    products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("tarjeta");

      const imageElement = document.createElement("img");
      imageElement.src = product.image;
      imageElement.classList.add("tarjeta_img");
      productElement.appendChild(imageElement);

      //formato de cada card
      productElement.innerHTML += `
        <div class="productDescription">
          <div class="tarjeta_titulo"><h2>${product.nombre}</h2></div>
          <div class="tarjeta_descripcion"><p>${product.precio}</p></div>
          <div class="bot"><button class="bot">AÑADIR AL CARRITO</button></div>
        </div>
      `;

      mainContainer.appendChild(productElement);

      // Agregar evento al botón "AÑADIR AL CARRITO"
      const addToCartBtn = productElement.querySelector(".bot");
      addToCartBtn.addEventListener("click", () => agregarAlCarrito(productElement));
    });
  })
  // manejo de error al realizar el fetch 
  .catch(error => {
    console.error("Error al cargar data.json:", error);
});




// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
    const productoEnCarrito = productosEnCarrito.find(p => p.id === producto.id);
  
    if (productoEnCarrito) {
      productoEnCarrito.cantidad++;
    } else {
      producto.cantidad = 1;
      productosEnCarrito.push(producto);
    }
  
    localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
    mostrarProductosEnCarrito();
  }

// Función para eliminar un producto del carrito
function eliminarProducto(indice) {
  productosEnCarrito.splice(indice, 1);
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
  mostrarProductosEnCarrito();
}

// Función para mostrar los productos en el carrito
function mostrarProductosEnCarrito() {
    carritoLista.innerHTML = '';
    let total = 0;
    let cantidadTotal = 0;
  
    productosEnCarrito.forEach(producto => {
      const { id, nombre, precio, cantidad } = producto;
      total += precio * cantidad;
      cantidadTotal += cantidad;
      const li = document.createElement('li');
      li.textContent = `${nombre} - $${precio} - Cantidad: ${cantidad}`;
      carritoLista.appendChild(li);
    });
  
    carritoTotal.textContent = `$${total}`;
    cantidadCarrito.textContent = cantidadTotal;
  }

// Función para reiniciar el carrito (vaciar todos los productos)
function reiniciarCarrito() {
  productosEnCarrito.length = 0;
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
  mostrarProductosEnCarrito();
}

// Evento para abrir el carrito al hacer clic en el icono del carrito
carritoIcono.addEventListener('click', () => {
  carritoContainer.style.display = 'flex';
  mostrarProductosEnCarrito();
});

// Evento para cerrar el carrito al hacer clic en el botón "Cerrar"
cerrarCarritoBtn.addEventListener('click', () => {
  carritoContainer.style.display = 'none';
});

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  const productoEnCarrito = productosEnCarrito.find(p => p.id === producto.id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    producto.cantidad = 1;
    productosEnCarrito.push(producto);
  }

  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
  mostrarProductosEnCarrito();

  // SweetAlert para agregar producto al carrito
  Swal.fire({
    icon: 'success',
    title: '¡Producto agregado!',
    text: `Se agregó ${producto.nombre} al carrito.`,
    showConfirmButton: false,
    timer: 1500
  });
}

// Función para eliminar un producto del carrito
function eliminarProducto(indice) {
  productosEnCarrito.splice(indice, 1);
  localStorage.setItem('productosEnCarrito', JSON.stringify(productosEnCarrito));
  mostrarProductosEnCarrito();

  // SweetAlert para eliminar producto del carrito
  Swal.fire({
    icon: 'success',
    title: '¡Producto eliminado!',
    text: 'Se eliminó el producto del carrito.',
    showConfirmButton: false,
    timer: 1500
  });
}

// Asocia la función reiniciarCarrito a un botón o evento en tu HTML para que se ejecute cuando el usuario quiera reiniciar el carrito
const botonReiniciar = document.getElementById('boton-reiniciar');
botonReiniciar.addEventListener('click', reiniciarCarrito);

// Llama a la función mostrarProductosEnCarrito al cargar la página para mostrar los productos almacenados en el carrito
mostrarProductosEnCarrito();

