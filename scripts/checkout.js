import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadProducts } from "../data/products.js";
import '../data/cart-class.js';


// after load products, then start to run the anonymous function,which will render the order summery and payment summery
loadProducts(()=>{
  renderOrderSummery();
  renderPaymentSummery();
});