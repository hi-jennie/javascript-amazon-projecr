 export class Cart {
  cartItem;
  localStorageKey;
  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage(){
    this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));
  
    if(!this.cartItem){
      this.cartItem = [
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
    
  }
   
  saveToStorage() {  
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));
  }
  
  addToCart(productId){
    let matchingItem;
  
    this.cartItem.forEach((item)=>{
      if(item.productId === productId){
        matchingItem = item;
      }
    });
    if(matchingItem){
      matchingItem.quantity += 1;
    }else{
      this.cartItem.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  }
  
  removeFromCart(productId){
    const newCart = [];
    this.cartItem.forEach((item)=>{
      if(item.productId !== productId){
        newCart.push(item);
      }
    });
    
    this.cartItem = newCart;
    this.saveToStorage();
  }
 }

 const cart = new Cart('cart-class');








