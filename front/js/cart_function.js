
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
    const cart = JSON.parse(localStorage.getItem('cart'));
    const ids = cart.map(product => product.id);
    return Array.from(new Set(ids));
};

export {deleteArticleFromPage, deleteDataFromCache, 
makeDescription, displayArticle, makeArticle, makeImageDiv, isFormFilled, getIdsFromCache};