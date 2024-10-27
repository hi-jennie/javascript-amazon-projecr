let orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addToOrder(){
  orders.unshift(orders);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}