import {loadFromStorage, addToCart,cart} from '../../data/cart.js';
import { deliveryOptions } from '../../data/deliveryOption.js';

describe('test suite: addToCart', ()=>{
  it('adds a new product to cart',()=>{
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    console.log(localStorage.getItem('cart'));
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    // this only work when we spy on the localStorage.setItem
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // check if the first item id
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

  it('adds an existing product to the cart',()=>{
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    
    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    // this only work when we spy on the localStorage.setItem
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    // check if the first item id
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
  });
});
