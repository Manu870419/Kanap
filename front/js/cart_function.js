// Récupération des éléments du cache
function retrieveItemsFromCache(){
    const numberOfItems = localStorage.length
   for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i)) || ""
    const itemObject = JSON.parse(item)
    cart.push(itemObject)
   };
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

// Supprimer l'article de la page
function deleteArticleFromPage(item){
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
};

// Supprimer les données du cache
function deleteDataFromCache(item){
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
};

// Enregistrer de nouvelles données dans le cache
function saveNewDataToCache(item){  
  const dataToSave = JSON.stringify(item)
  const key = `${item.id}-${item.color}`
  localStorage.setItem(key, dataToSave)
};

// Faire une description du produit
function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("cart__item__content__description")
    
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + " €"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
};

// Afficher l'article
function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
};

// Faire un article
function makeArticle(item) {
    const article =document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
};

// Faire une image div
function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
};


// Si le formulaire est vide
function isFormFilled(){
    const form = document.querySelector(".cart__order__form")
    const inputs= form.querySelectorAll("input")
    inputs.forEach((input) => {
        if(input.value === ""){
            alert("Veuillez remplir tous les champs")
            return true
        }
        return false
    })
    const email = document.querySelector("#email").value
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (regex.test(email) === false){
        alert("Veuillez saisir une adresse email valide")
        return true
    }
    return false
};


// Obtenir des identifiants à partir du cache
function getIdsFromCache(){
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++){
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
};

export {deleteArticleFromPage, deleteDataFromCache, saveNewDataToCache, 
makeDescription, displayArticle, makeArticle, makeImageDiv, isFormFilled, getIdsFromCache};