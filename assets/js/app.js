const products = [
    {
        "id": 1,
        "name": "Chamarra Color Beige",
        "qualification": 4,
        "category": "T-Shirt",
        "price": 55000,
        "img_url": "./assets/img/pro1.jpg"
    },
    {
        "id": 2,
        "name": "Blusa Manga Larga Amarilla",
        "qualification": 3,
        "category": "T-Shirt",
        "price": 35000,
        "img_url": "./assets/img/pro2.jpg"
    },
    {
        "id": 3,
        "name": "Blusa Animal Prink",
        "qualification": 4,
        "category": "Animal Prink",
        "price": 25000,
        "img_url": "./assets/img/pro3.jpg"
    },
    {
        "id": 4,
        "name": "Chaqueta Gris",
        "qualification": 4,
        "category": "T-Shirt",
        "price": 125000,
        "img_url": "./assets/img/pro4.jpg"
    },
    {
        "id": 6,
        "name": "Blusa Ancha Azul",
        "qualification": 3,
        "category": "Blusas",
        "price": 55000,
        "img_url": "./assets/img/pro5.jpg"
    },
    {
        "id": 7,
        "name": "Blusa Ancha Crema",
        "qualification": 5,
        "category": "Blusas",
        "price": 80000,
        "img_url": "./assets/img/pro6.jpg"
    },
    {
        "id": 8,
        "name": "Blusa Manga Larga Gris",
        "qualification": 3,
        "category": "T-Shirt",
        "price": 35000,
        "img_url": "./assets/img/pro7.jpg"
    },
]
let productsInCar = [];
const nameCarLS = "carrito";

laodProducts();
loadProductInCar();

function laodProducts(){

    const cardsProducts = document.querySelector('.cards-products');;
    let html = '';

    products.forEach(
        (product) => {
            html += `
            <div class="card">
                <img src="${product.img_url}" alt="">
                <div class="box-info">
                    <div class="box-calificacion">
                        <img src="./assets/img/star_high.svg" alt="">
                        <img src="./assets/img/star_high.svg" alt="">
                        <img src="./assets/img/star_high.svg" alt="">
                        <img src="./assets/img/star_high.svg" alt="">
                        <img src="./assets/img/star_low.svg" alt="">
                    </div>
                    <h2 class="name-product">${product.name}</h2>
                    <h3 class="category-product">${product.category}</h3>
                    <span class="price-product">${formattterPrice(product.price)}</span>
                </div>
                <button class="btn btn-add-to-car" onClick="addToCar(${product.id})">
                    <img src="./assets/img/add-to-car.svg" alt="">
                </button>
            </div>
            `
        }
    )
    
    cardsProducts.innerHTML = html;

}


function formattterPrice(price) {
    const formatter = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return formatter.format(price);
}

function addToCar(productId) {

    let productNew = {
        id: productId,
        cantidad: 1
    }

    if(getCarLS() === false){
        productsInCar.push(productNew);
        localStorage.setItem(nameCarLS, JSON.stringify(productsInCar));
        loadProductInCar()
    } else {
        productsInCar = getCarLS();

        let productoEncontrado = false;

        productsInCar.forEach(
            (product) => {
                if(product.id === productId) {
                    product.cantidad ++;
                    productoEncontrado = true;
                }
            }
        )

        if(!productoEncontrado) {
            productsInCar.push(productNew);
        }
        localStorage.setItem(nameCarLS, JSON.stringify(productsInCar));
        loadProductInCar()
    }

    
}

function loadProductInCar() {
    const cardsCar = document.querySelector('.cards-car');
    let html = ' <h2>Carrito de Compras</h2>';
    productsInCar = getCarLS(); 
    const badge = document.querySelector('.badge .qty');

    let productsInCarView = [];
    if(productsInCar == false) {
        cardsCar.innerHTML = html;
        badge.innerHTML = 0;
        productsInCar = [];
        return;
    } else {
        products.forEach(
            (product) => {
                productsInCar.forEach(
                    (productInCar) => {
                        if(productInCar.id === product.id){
                            let productNew = {
                                ...product,
                                cantidad: productInCar.cantidad
                            }
                            productsInCarView.push(productNew)
                        }
                    }
                )
            }
        )
    
        productsInCarView.forEach(
            (productInCar) => {
                html += `
                    <div class="card-pro-car">
                        <img src="${productInCar.img_url}" alt="">
                        <div class="box-info">
                            <h2 class="name-product">Chamarra Color Beige</h2>
                            <span class="price-product-qty">${formattterPrice(productInCar.price)} * ${productInCar.cantidad}</span>
                            <span class="price-product-total">${formattterPrice(productInCar.price*productInCar.cantidad)}</span>
                        </div>
                        <button class="btn btn-borrar" onclick="deleteToCar(${productInCar.id})">
                            X
                        </button>
                    </div>
                `;
            }
        )
        html +=`<button class="btn btn-clear-car" onclick="clearCarrito()">Limpiar Todo</button>`;    
        cardsCar.innerHTML = html
        badge.innerHTML = productsInCarView.length;
    }
    
}


function getCarLS() {
    if (localStorage.getItem(nameCarLS)) {
        return JSON.parse(localStorage.getItem(nameCarLS));
    } else {
        return false;
    }
}

function deleteToCar(productId) {
    productsInCar = getCarLS();

    productsInCar.forEach(
        (product, index) => {
            if( product.id === productId) {
                productsInCar.splice(index, 1);
            }
        }
    )

    localStorage.setItem(nameCarLS, JSON.stringify(productsInCar));
    loadProductInCar()
}


function toggleCar() {
    document.querySelector('.cards-car').classList.toggle('toggle');
}

function clearCarrito() {
    localStorage.removeItem(nameCarLS)
    loadProductInCar();
}