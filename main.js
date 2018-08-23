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
      quantity: 1
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
        <button class="btn ntn-primary btn-small" data-action="decreaseQty">&minus;</button>
        <h3 class="cartItemQty">${items.quantity}</h3>
        <button class="btn ntn-primary btn-small" data-action="increaseQty">&plus;</button>
        <button class="btn btn-danger btn-small" data-action="removeItem">&times;</button>
      </div>
      `);
      cart.push(items);
      addToCartBtn.innerText ='SAVED TO CART';

      const cartItems = cartElements.querySelectorAll('.cartNewItem');
      cartItems.forEach(cartItemsIteration => {
      if(cartItemsIteration.querySelector('.nameCartItem').innerText === items.name){
        // Here we increase the items quantity.
        cartItemsIteration.querySelector('[data-action="increaseQty"]').addEventListener('click', () => {
          cart.forEach(cartItemSingle => {
            if(cartItemSingle.name === items.name) {
              cartItemsIteration.querySelector('.cartItemQty').innerText = ++cartItemSingle.quantity;
            }
          });
        });
        // Here we decrease the items quantity.
        cartItemsIteration.querySelector('[data-action="decreaseQty"]').addEventListener('click', () => {
          cart.forEach(cartItemSingle => {
            if(cartItemSingle.name === items.name) {
              if(cartItemSingle.quantity > 1){
                cartItemsIteration.querySelector('.cartItemQty').innerText = --cartItemSingle.quantity;
              } else {
                cartItemsIteration.remove(); // Here we remove the item from the DOM.
                cart = cart.filter(cartItemSingle => cartItemSingle.name !== item.name);
                addToCartBtn.innerText = 'ADD TO CART';
              }
            }
          });
        });


      }
      });
    }
  });
});