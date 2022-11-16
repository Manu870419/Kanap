
// Supprimer l'article de la page
function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(`article[data-id="${item.id}"][data-color="${item.color}"]`)
    articleToDelete.remove()
};

// Supprimer les données du cache
function deleteDataFromCache(item) {
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
    const article = document.createElement("article")
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
function isFormFilled() {
    // On vérifie que l'utilisateur rentre des informations conformes au formulaire de contact
    const regexName = /^(?=.{1,50}$)[a-z\u00C0-\u00FF]+(?:['-_.\s][a-z\u00C0-\u00FF]+)*$/i;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexLocation = /^[a-zA-Z0-9\u00C0-\u00FF\s,. '-]{3,}$/;

    //Prépare l'obj contact pour la requête POST
    let contact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value
    };
    // Si le formulaire est vide ou incorrectement rempli 
    if (regexName.test(contact.firstName) === false) {
        // Avertir l'utilisateur qu'il n'a pas (ou mal) rempli les champs d'informations  
        alert("Veuillez saisir un prénom valide")
        return true
    };
    if (regexName.test(contact.lastName) === false) {
        alert("Veuillez saisir un nom valide")
        return true
    };
    if (regexLocation.test(contact.address) === false) {
        alert("Veuillez saisir une adresse valide")
        return true
    };
    if (regexLocation.test(contact.city) === false) {
        alert("Veuillez saisir une ville valide")
        return true
    };
    if (regexEmail.test(contact.email) === false) {
        alert("Veuillez saisir une adresse email valide")
        return true
    };
    return false

};


// Obtenir des identifiants à partir du cache
function getIdsFromCache() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const ids = cart.map(product => product.id);
    return Array.from(new Set(ids));
};

export {
    deleteArticleFromPage, deleteDataFromCache,
    makeDescription, displayArticle, makeArticle, makeImageDiv, isFormFilled, getIdsFromCache
};