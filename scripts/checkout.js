import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import '../data/cart-class.js';

// Promise.all let us to run all the promises at the same time

Promise.all([
  new Promise((resolve)=>{
    loadProducts(()=>{
      resolve('value1');
    });
  }),
  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    });
  })
]).then((values)=>{
  console.log(values); // ['value1', undefined]
  renderOrderSummery();
  renderPaymentSummery();
});

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