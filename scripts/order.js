import { renderOrderSummery } from "./checkout/orderSummery.js";
import { renderPaymentSummery } from "./checkout/paymentSummery.js";
import { loadProducts, loadProductsFetch, getProductById } from "../data/products.js";
import { loadCart, findCartItem} from "../data/cart.js";
import '../data/cart-class.js';
import {orders} from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {formatCurrency} from './utils/money.js';

let ordersHTML = '';
console.log(orders);

orders.forEach((order) => {
  let orderHTML = ''; // 每个订单的 HTML  
  let total = 0;
  
 
  // 遍历订单中的商品 ID 数组
  const productIdArr = order.cartIdArr;
  let detailsHTML = ''; // 用于拼接每个商品的详情

  productIdArr.forEach((productId) => {
    const matchingProduct = getProductById(productId);
    const matchingCartItem = findCartItem(productId);
    total += matchingProduct.priceCents * matchingCartItem.quantity;
    
    detailsHTML += `
      <div class="order-details-grid js-order-details-grid">
        <div class="product-image-container">
          <img src=${matchingProduct.image}>
        </div>
        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: August 15
          </div>
          <div class="product-quantity">
            Quantity: ${matchingCartItem.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
    `;
  });

  

  // 构建订单头部
  let orderHeader = `
    <div class="order-header js-order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${order.date}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(total)}</div>
        </div>
      </div>
      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.orderId}</div>
      </div>
    </div>
  `;
  orderHTML += orderHeader;
  orderHTML += detailsHTML;
  // 将订单包裹在一个容器中
  let orderContainer = `
    <div class="order-container js-order-container-${order.orderId}">
      ${orderHTML}
    </div>
  `;

  ordersHTML += orderContainer; // 累加所有订单的 HTML
});

// 最后将拼接好的所有订单 HTML 插入到页面中
document.querySelector('.js-orders-grid').innerHTML = ordersHTML;

// 错误做法
// let ordersHTML = '';
// console.log(orders)
// let orderContainer = `<div class="order-container js-order-container">1</div>`;
// orders.forEach((order) => {



//   let orderHTML = '';
//   let orderHeader = `
//   <div class="order-header js-order-header">
//     <div class="order-header-left-section">
//       <div class="order-date">
//         <div class="order-header-label">Order Placed:</div>
//         <div>August 12</div>
//       </div>
//       <div class="order-total">
//         <div class="order-header-label">Total:</div>
//         <div>$35.06</div>
//       </div>
//     </div>

//     <div class="order-header-right-section">
//       <div class="order-header-label">Order ID:</div>
//       <div>${order.orderId}</div>
//     </div>
//   </div>
//   `;
//   orderHTML += orderHeader;
//   const productIdArr = order.cartIdArr;
  
//   let detailsHTML = '';
  
//   productIdArr.forEach((productId) => {
//     const  matchingProduct = getProductById(productId);
//     const matchingCartItem = findCartItem(productId);
//     detailsHTML += `
//     <div class="order-details-grid js-order-details-grid">
//       <div class="product-image-container">
//         <img src=${matchingProduct.image}>
//       </div>

//       <div class="product-details">
//         <div class="product-name">
//           ${matchingProduct.name}
//         </div>
//         <div class="product-delivery-date">
//           Arriving on: August 15
//         </div>
//         <div class="product-quantity">
//           Quantity: ${matchingCartItem.quantity}
//         </div>
//         <button class="buy-again-button button-primary">
//           <img class="buy-again-icon" src="images/icons/buy-again.png">
//           <span class="buy-again-message">Buy it again</span>
//         </button>
//       </div>

//       <div class="product-actions">
//         <a href="tracking.html">
//           <button class="track-package-button button-secondary">
//             Track package
//           </button>
//         </a>
//       </div>
//     </div>
//     `;
//     orderHTML += detailsHTML;
//   });
  
//   document.querySelector('.js-order-container').innerHTML = orderHTML;

//   ordersHTML += orderContainer;
  
// });
// console.log(ordersHTML);
// document.querySelector('.js-orders-grid').innerHTML = ordersHTML;