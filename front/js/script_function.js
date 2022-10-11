
// faire l'ancre
function makeAnchor(id){
  const anchor = document.createElement("a")
  anchor.href = "./product.html?id=" + id
  return anchor 
};

// Faire l'image du produit
function makeImage(imageUrl,altTxt){
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
  return image 
};

// Faire le nom du produit
function makeH3(name){
  const h3 = document.createElement("h3")
  h3.textContent = name
  h3.classList.add("productName")
  return h3
};

// Faire la description du produit
function makeParagraph(description){
    const p = document.createElement("p")
    p.textContent = description
    p.classList.add("productDescription")
    return p
}; 
  
// Ajout d'éléments
function appendItems(anchor,article){
  const items = document.querySelector("#items")
    if (items !=null){
      items.appendChild(anchor)
      anchor.appendChild(article)   
    }
};

// Ajout d'éléments à l'article
function appendElementsToArticle(article, array){
  array.forEach((item) => {
  article.appendChild(item)
  });
  //article.appendChild(image)
  //article.appendChild(h3)
  //article.appendChild(p)
};

export {makeAnchor, makeImage, makeH3, makeParagraph, appendElementsToArticle,appendItems};