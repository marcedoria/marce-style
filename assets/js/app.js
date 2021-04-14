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
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0
    })

    return formatter.format(price);
}

function addToCar(productId) {

    let productNew = {
        id: productId,
        cantidad: 1
    }

    console.log(getCarLS());

    if(getCarLS() === false){
        productsInCar.push(productNew);
        localStorage.setItem(nameCarLS, JSON.stringify(productsInCar));
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
    }

    
}

function getCarLS() {
    if (localStorage.getItem(nameCarLS)) {
        return JSON.parse(localStorage.getItem(nameCarLS));
    } else {
        return false;
    }
}
