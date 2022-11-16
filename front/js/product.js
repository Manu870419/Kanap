import {makeImage, makeTitle, makePrice, makeCartContent, makeColors, isOrderInFilled, saveOrder, redirectToCart} from "../js/product_function.js";
import { diskStorage } from "./localStorage_function.js";

diskStorage();

// Récupération de l'id depuis l'url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get('id')

  let itemPrices,
  let imgUrl, altText, articleName
  
// Récupération de données par rapport à l'id récupéré dans l'url du produit
fetch ("http://localhost:3000/api/products/${id}")
  .then((response) => response.json())
  .then((res) => handleData(res))
  
// Affichage du produit
function handleData(kanap) {
  const { altTxt, colors, description, imageUrl, name, price } = kanap
  itemPrices = price;
  imgUrl = imageUrl;
  altText = altTxt;
  articleName = name;
  makeImage(imageUrl, altTxt)
  makeTitle(name)
  makePrice(price)
  makeCartContent(description)
  makeColors(colors)
};

// Sélection du bouton ajouter au panier
const button = document.querySelector("#addToCart")
button.addEventListener("click", handleClick)

// Ajout du produit lors du clique
function handleClick() {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value

  if (Number(quantity) < 0 || Number(quantity) > 100) {
    alert("Veuillez sélectionner une quantité entre 1 et 100")
  } else {

    // Si commande invalide
    if (isOrderInFilled(color, quantity)) return;

    // Enregistrer la commande
    saveOrder(color, quantity)

    // Rediriger vers le panier
    redirectToCart()
  };
};






