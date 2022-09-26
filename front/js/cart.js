import {deleteArticleFromPage, deleteDataFromCache, saveNewDataToCache, 
    makeDescription, displayArticle, makeArticle, makeImageDiv, isFormFilled, getIdsFromCache} from "./cart_function.js"
const cart = [];

// Récupération des éléments du cache
retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function retrieveItemsFromCache(){
    const numberOfItems = localStorage.length
   for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
   };
};

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
    const total = cart.reduce((total, item) => total + item.quantity, 0)
    totalQuantity.textContent = total
};

// Prix totale de l'affichage 
function displayTotalPrice(){
    const totalPrice = document.querySelector("#totalPrice")
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
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
function makeSettings (item){
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
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
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
    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Mettre à jour le prix et la quantité
function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

// Formulaire
function submitForm(e){
    e.preventDefault()
    if(cart.length === 0) {
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
