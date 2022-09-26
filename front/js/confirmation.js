import{getOrderId, displayOrderId, removeAllCache} from "./confirmation_function.js"

// Récupération de l'id depuis l'url
const orderId = getOrderId()

// Affichage du numéro de commande
displayOrderId(orderId)

// Efface le cache
removeAllCache()
