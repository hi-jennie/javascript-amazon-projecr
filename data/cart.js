import { deliveryOptions } from "./deliveryOption.js";

// JSON.parse(localStorage.getItem('cart')); 是从本地解析一个叫'cart'的东西。
export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1,
    deliveryOptionId: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }
];
}


// using localStorage to store the information of cart
// cause when we refresh the page, the app will also reset the cart variable
function saveToStorage() {
  // JSON.stringify(cart) 是将cart 数组里面的内容变成JSON格式，然后存入本地一个叫本地叫'cart' 的变量里面
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId){
  let matchingItem;

  cart.forEach((item)=>{
    if(item.productId === productId){
      matchingItem = item;
    }
  });
  if(matchingItem){
    matchingItem.quantity += 1;
  }else{
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((item)=>{
    if(item.productId !== productId){
      newCart.push(item);
    }
  });
  
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingItem;

  cart.forEach((item)=>{
    if(item.productId === productId){
      matchingItem = item;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
