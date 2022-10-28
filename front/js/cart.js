import {deleteArticleFromPage, deleteDataFromCache, 
    makeDescription, displayArticle, makeArticle, makeImageDiv, isFormFilled, getIdsFromCache} from "./cart_function.js"

let localStorageCart = JSON.parse(localStorage.getItem('cart'));
let cartWithPrices;
   
if ( localStorageCart === null || localStorageCart.lenght === 0 ) {
    totalQuantity.textContent = '0';
    totalPrice.textContent = '0'; 
};

Promise.all(getIdsFromCache().map( id => fetch(`http://localhost:3000/api/products/${id}`)))
  .then(responses => Promise.all(responses.map(response => response.json())))
  .then(products => {
    cartWithPrices = localStorageCart.map(cartProduct => ({
        ...cartProduct, 
        price: products.find(product => cartProduct.id === product._id).price
    }));
    cartWithPrices.forEach((item) => displayItem(item));
});

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

// Affichage de l'article ou des articles
function displayItem(item) {
    const article = makeArticle(item)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayArticle(article)
    displayTotalQuantity()
    displayTotalPrice()
};

// Quantité totale de l'affichage
function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    const total = cartWithPrices.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
};

// Prix totale de l'affichage 
function displayTotalPrice(){
    const totalPrice = document.querySelector("#totalPrice")
    const total = cartWithPrices.reduce((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total
};

// Faire le contenu du panier
function makeCartContent(item){
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")

    const description = makeDescription(item)
    const settings = makeSettings(item) 

    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}
// faire le réglage du panier
function makeSettings (item){2
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")

    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings,item)
    return settings
}
// Ajouter supprimer au paramètre
function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click",() => deleteItem(item)) 

    const p = document.createElement("p")
    p.textContent = "supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

// Supprimer l'élément
 function deleteItem(item){
    localStorageCart = localStorageCart.filter(product => product.id !== item.id || product.color !== item.color);
    localStorage.setItem('cart', JSON.stringify(localStorageCart))
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCache(item)
    deleteArticleFromPage(item)
 }

// Ajouter de la quantité au réglage
function addQuantityToSettings(settings, item){
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté :"
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    input.addEventListener("input", () => updatePriceAndQuantity(item, input.value))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Mettre à jour le prix et la quantité
function updatePriceAndQuantity(newValue, item) {
    localStorageCart.map(product => {
       delete product['price'];
        if (product.id === item.id && product.color === item.color) {
            return product.quantity = Number(newValue)
        };
    });
    displayTotalQuantity(newValue);
    displayTotalPrice(newValue);
};

// Formulaire
function submitForm(e){
    e.preventDefault()
    if(localStorageCart.length === 0) {
        alert("Veuillez sélectionner les articles à acheter")
        return
    } 

     if (isFormFilled()) return
    

    // faire le corps de la demande
    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers:{
            "Content-Type": "application/json"
        } 
    })
       .then((res) => res.json())
       .then((data) => {
        const orderId = data.orderId
        window.location.href = "./confirmation.html" + "?orderId=" + orderId;
    })
        .catch((err) => console.error(err))
}

function makeRequestBody(){
    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = { contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city:city,
        email: email
    },
        products: getIdsFromCache()
    }
    return body
};
