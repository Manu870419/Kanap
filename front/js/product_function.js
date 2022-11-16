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


function isOrderInFilled(color, quantity) {
    if (color == null || color === "" || quantity == null || quantity == 0) {
        alert("Veuillez sélectionner une couleur et une quantité")
        return true;
    };
};



function saveOrder(newProduct) {
    const cart = JSON.parse(localStorage.getItem('cart'));
   
    //Si le produit est déjà dans le panier (même id et même couleur)
    if (cart.some(product => product.id === newProduct.id && product.color === newProduct.color)) {
        cart.map(product => {
            if (product.id === newProduct.id && product.color === newProduct.color) {
                return product.quantity += newProduct.quantity
            }
        })
    } else {
        cart.push(newProduct)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
};

function redirectToCart() {
    window.location.href = "cart.html"
};

export{makeImage, makeTitle, makePrice, makeCartContent, makeColors, isOrderInFilled, saveOrder, redirectToCart};