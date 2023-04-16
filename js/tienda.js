//script funcionalidad de carrito y tienda
carrito = [];

loadLocalStorage();

let buttonCarrito = document.querySelector(".carrito");
let modalCarrito = document.querySelector(".cart-products");
let closeCarrito = document.querySelector(".close-btn");

buttonCarrito.addEventListener("click", (e) => {
    modalCarrito.style.display = "block";
})

closeCarrito.addEventListener("click", (e) => {
    modalCarrito.style.display = "none";
})

let addButtons = document.querySelectorAll(".add");

addButtons.forEach((button) => {
    button.addEventListener("click", addCart);
});


//Funciones

function addCart(event) {

    Swal.fire({
        title: '¿Estas seguro?',
        text: "¿Quieres agregar este elemento a tu carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, agrégalo!'
    }).then((result) => {
        if (result.isConfirmed) {
            let cartItem = event.target.parentNode;

            let nombre = cartItem.querySelector("p:nth-of-type(1)").textContent;
            let precio = cartItem.querySelector("p:nth-of-type(2)").textContent;
            let imagen = cartItem.querySelector("img").getAttribute("src");

            let exist = false;

            for (let i = 0; i < carrito.length; i++) {
                if (carrito[i].nombre === nombre) {
                    carrito[i].cantidad++;
                    exist = true;
                    break;
                }
            }

            if (!exist) {
                let nuevoItem = { nombre, precio, imagen, cantidad: 1 };
                carrito.push(nuevoItem);
            }

            saveLocalStorage("Carrito", carrito);

            updateCart();
            Swal.fire(
                'Hecho!',
                'Elemento agregado al carrito de compras.',
                'success'
            )
        }
    })


}

function saveLocalStorage(key, array) {
    localStorage.setItem(key, JSON.stringify(array));
}

function loadLocalStorage() {
    carrito = JSON.parse(localStorage.getItem("Carrito")) || [];
    updateCart();
}

function updateCart() {
    let plantilla = carrito
        .map(
            (val, index) => `
            <div class="item">
                <img src="${val.imagen}">
                <p>${val.nombre}</p>
                <p>${val.precio}</p>
                <p>Cantidad: ${val.cantidad}</p>
                <button class="delete-item" data-index="${index}">X</button>
            </div>
            `
        ).join('');

    //Se inserta la plantilla
    let itemContainer = document.querySelector(".item-container");
    itemContainer.innerHTML = plantilla;
    //Se calcula el total de items
    let cantidadTotal = calcularCantidad();
    document.querySelector(".totalItems").innerHTML = cantidadTotal;
    //Se calcula precio total
    let total = calcularTotal();
    document.querySelector(".total").innerHTML = "Total: " + total.toLocaleString("es-CO", { style: "currency", currency: "COP" })
    //Botones de eliminar item
    let deleteButtons = document.querySelectorAll(".delete-item");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", deleteItem);
    })

}

function deleteItem(event) {
    Swal.fire({
        title: '¿Estas seguro?',
        text: "¿Quieres eliminar este elemento de tu carrito?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, elimínalo!'
    }).then((result) => {
        if (result.isConfirmed) {
            let index = parseInt(event.target.dataset.index);

            carrito[index].cantidad--;
            if (carrito[index].cantidad === 0) {
                carrito.splice(index, 1);
            }
            saveLocalStorage("Carrito", carrito);

            updateCart();
            Swal.fire(
                'Hecho!',
                'Elemento eliminado del carrito.',
                'success'
            )
        }
    })

}

function calcularCantidad() {
    let cantidad = 0;
    for (let i = 0; i < carrito.length; i++) {
        cantidad += carrito[i].cantidad;
    }
    return cantidad;
}

function calcularTotal() {
    let total = 0;
    for (let i = 0; i < carrito.length; i++) {
        let precio = parseInt(carrito[i].precio);
        let cantidad = carrito[i].cantidad;
        total += precio * cantidad;
    }
    return total;
}
