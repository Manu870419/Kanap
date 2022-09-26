//import {makeImage, makeTitle, makePrice, makeCartContent, makeColors, saveOrder, isOrderInValid, redirectToCart} from "./product_function.js"
// Récupération de l'id depuis l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')
if (id != null) {
 let itemPrice = 0
 let imgUrl, altText, articleName
};

// Récupération de données par rapport à l'id récupéré dans l'url du produit
fetch(`http://localhost:3000/api/products/${id}`)
 .then((response) => response.json())
 .then((res) => handleData(res))

// Affichage du produit
function handleData(kanap) {
 const {altTxt, colors, description, imageUrl, name, price} = kanap
 itemPrice = price;
 imgUrl = imageUrl;
 altText = altTxt; 
 articleName = name;
 makeImage(imageUrl, altTxt)
 makeTitle(name)
 makePrice(price)
 makeCartContent(description)
 makeColors(colors)
};

// Faire l'image du produit
function makeImage(imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  const parent = document.querySelector(".item__img")
  if (parent != null) parent.appendChild(image)
};

// Faire le titre de l'image
function makeTitle(name) {
  const h1 = document.querySelector("#title")
  if (h1 != null) h1.textContent = name
};

// Faire le prix du produit 
function makePrice(price) {
  const span = document.querySelector("#price")
  if (span != null) span.textContent = price
};

// Faire le contenu du panier
function makeCartContent(description) {
  const p = document.querySelector("#description")
  if (p != null) p.textContent = description
};

// Mettre les couleurs du produit
function makeColors(colors) {
  const select = document.querySelector("#colors")
  if (select != null) {
    colors.forEach((color) => {
      const option = document.createElement("option")
      option.value = color
      option.textContent = color
      select.appendChild(option)
    });
  };
};

// Sélection du bouton ajouter au panier
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

// Ajout du produit lors du clique
function handleClick() {
 const color = document.querySelector("#colors").value
 const quantity = document.querySelector("#quantity").value

 // Si commande invalide
 if(isOrderInValid(color, quantity)) return;

 // Enregistrer la commande
 saveOrder(color, quantity)

 // Rediriger vers le panier
 redirectToCart()
};

function isOrderInValid(color, quantity) {
  if (color == null || color === "" ||quantity == null || quantity == 0) {
   alert("Veuillez sélectionner une couleur et une quantité")
    return true;
  };
};

function saveOrder(color, quantity) {
  const cart= `${id}`
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: itemPrice,
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName
  };
  localStorage.setItem(cart, JSON.stringify(data))
};

function redirectToCart() {
  window.location.href = "cart.html"
};


  