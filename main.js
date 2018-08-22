// First let's enable strict mode to catch as many errors as we can.
'use strict';

// Next let's declare some variables.
const cart = [];
const cartElements = document.querySelector('.cart');
const addToCartBtns = document.querySelectorAll('[data-action="addToCart"]');

addToCartBtns.forEach(addToCartBtn => {
  addToCartBtn.addEventListener('click', () => {
    const item = addToCartBtn.parentNode;
    const items = {
      image: item.querySelector('.itemImage').getAttribute('src'),
      name: item.querySelector('.itemName').innerText,
      price: item.querySelector('.itemPrice').innerText,
    }

    // Here let's check first if the items is already in the cart.
    const itemInCart = (cart.filter(cartNewItem => (cartNewItem.name === items.name)).length > 0);

    // If the item is not in the cart...
    if(!itemInCart) {
      // We run the following block of code.
      cartElements.insertAdjacentHTML('beforeend', `
      <div class="cartNewItem">
        <img class="imageCartItem" src="${items.image}" alt="${items.name}">
        <h3 class="nameCartItem">${items.name}</h3>
        <h3 class="priceCartItem">${items.price}</h3>
      </div>
      `);
      cart.push(items);
      addToCartBtn.innerText ='SAVED TO CART';
    }
  });
});