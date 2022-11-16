function diskStorage (){
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]))
      };
};

function diskStorageCart(){
   let localStorageCart = diskStorageCart 
    if (localStorageCart === null || localStorageCart.lenght === 0) {
        totalQuantity.textContent = '0';
        totalPrice.textContent = '0';
    };
};

export{diskStorage, diskStorageCart};