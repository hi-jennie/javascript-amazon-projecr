import {cart,removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import {products} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions} from '../../data/deliveryOption.js';
import { renderPaymentSummery } from './paymentSummery.js';

/*
hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days');
console.log(deliveryDate.format('dddd, MMMM D'));
*/

export function renderOrderSummery(){
// the final HTML
let cartSummeryHTML = '';

// generate the HTML for every cart item
cart.forEach((cartItem)=>{
  const cartItemProductId = cartItem.productId;

  let matchingProduct;
  products.forEach((product)=>{
    if(product.id === cartItemProductId){
      matchingProduct = product;
    }
  });

  let deliveryOptionId = cartItem.deliveryOptionId;
  let matchingDeliveryOption;

  deliveryOptions.forEach((curOption)=>{
    if(curOption.id===deliveryOptionId){
      matchingDeliveryOption = curOption;
    }
  })

  const today = dayjs();
  const shippingDays = today.add(`${matchingDeliveryOption.deliveryDays}`,'days').format('dddd, MMMM D');
  

  cartSummeryHTML += `<div class="cart-item-container js-cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${shippingDays}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionHTML(matchingProduct,cartItem)}
        </div>
      </div>
    </div>`;

});

function deliveryOptionHTML(matchingProduct,cartItem){
  let html = '';

  deliveryOptions.forEach((deliverOption)=>{
    const today = dayjs();

    const shippingDays = today.add(`${deliverOption.deliveryDays}`,'days').format('dddd, MMMM D');

    const deliveryFees = deliverOption.id === '1' ? 'FREE' : `$${formatCurrency(deliverOption.priceCents)}`;
    
    const isChecked = deliverOption.id === cartItem.deliveryOptionId;
    html += `
    <div class="delivery-option js-delivery-option" 
      data-product-id = ${matchingProduct.id} data-delivery-option-id = ${deliverOption.id}>
      <input type="radio" 
        ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${shippingDays}
        </div>
        <div class="delivery-option-price">
          ${deliveryFees } Shipping
        </div>
      </div>
    </div>
    `;
  });
  return html;
}

document.querySelector('.js-cart-summery').innerHTML = cartSummeryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((deleteLink)=>{
    deleteLink.addEventListener('click',()=>{
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);
    
      const deleteContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      deleteContainer.remove();
      renderPaymentSummery()
      
    });   
  });


document.querySelectorAll('.js-delivery-option')
  .forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummery();
      renderPaymentSummery();
    })
    
  });
}
