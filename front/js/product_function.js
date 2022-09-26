 // Affichage du produit
  
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

//Enregister la commande
function saveOrder(color, quantity) {
  const key = `${id}-${color}`
  const data = {
    id: id,
    color: color,
    quantity: Number(quantity),
    price: itemPrice,
    imageUrl: imgUrl,
    altTxt: altText,
    name: articleName
  };
  localStorage.setItem(key, JSON.stringify(data))
};

// Si commande invalide
function isOrderInValid(color, quantity) {
  if (color == null || color === "" ||quantity == null || quantity == 0) {
   alert("please select a color and quantity")
    return true;
  };
};

// Redirection vers le panier
function redirectToCart() {
  window.location.href = "cart.html"
};

//export {makeImage, makeTitle, makePrice, makeCartContent, makeColors, saveOrder, isOrderInValid, redirectToCart};