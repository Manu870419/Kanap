import {makeAnchor, makeImage, makeH3, makeParagraph, appendElementsToArticle, appendItems} from "./index_function.js"

// Récupération données de l'API.
fetch("http://localhost:3000/api/products")
  .then ((res) => res.json())
  .then ((data) => {addProducts(data)});

// Affichage des produits sur la page d'acceuil

function addProducts(kanaps){
  //const _id = kanaps[0]._id
  // const imageUrl = kanaps[0].imageUrl
  //const altTxt = kanaps[0].altTxt
  //const name = kanaps[0].name
  //const description = kanaps[0].description

  kanaps.forEach (kanap =>{
   const {_id, imageUrl, altTxt, name, description } = kanap
   const anchor = makeAnchor(_id)
   const article = document.createElement("article")
   const image = makeImage(imageUrl,altTxt)
   const h3 = makeH3(name)
   const p = makeParagraph(description)

   appendElementsToArticle(article, [image, h3, p])
   appendItems(anchor,article) 
  }) 
};



