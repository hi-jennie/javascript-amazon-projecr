import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import '../data/cart-class.js';

// async: this will return a promise

async function loadPage(){
  console.log('loadPage');
  // await: block the code until the promise is resolved
  await loadProductsFetch();

  // instead of pass value3 to the next then(), we can use a variable to store the value
  const value = await new Promise((resolve)=>{
    loadCart(()=>{
      resolve('value3');
    });
  });

  renderOrderSummery();
  renderPaymentSummery();

  return 'value1'; // this will be saved as the argument of the next then()
}

loadPage().then((value)=>{
  console.log(value);
});


/*
// Promise.all let us to run all the promises at the same time
Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{
  console.log(values); // [, undefined]
  renderOrderSummery();
  renderPaymentSummery();
});
*/


/*
// Promise is better than callback, because it can keep the code flat and easy to read
new Promise((resolve)=>{
  loadProducts(()=>{
    resolve('value1');
  });

}).then((value)=>{
console.log(value);

  return new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  });

}).then(()=>{
    renderOrderSummery();
    renderPaymentSummery();
});
*/

/*
after load products, then start to run the anonymous function,which will render the order summery and payment summery
loadProducts(()=>{
  renderOrderSummery();
  renderPaymentSummery();
});
*/