export let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addToOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function createOrder(cart, date){
  const cartIdArr = cart.map((item)=>item.productId);
  const order = {
    orderId: Math.floor(Math.random()*1000000),
    cartIdArr: cartIdArr,
    date: date
  };
  addToOrder(order);  
}