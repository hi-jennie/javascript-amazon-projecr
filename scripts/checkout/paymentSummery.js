import { cart } from '../../data/cart.js';
import { deliveryOptions, getDeliveryOption } from '../../data/deliveryOption.js';
import { getProductById, products } from '../../data/products.js';
import { formatCurrency } from '../utils/money.js'
import {addToOrder} from '../../data/orders.js';

export function renderPaymentSummery(){
  let totalItemPrice = 0;
  let totalShippingPrice = 0;
  let totalQuantity = 0;
  
  let html = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct = getProductById(productId);
    
    const itemPrice = matchingProduct.priceCents * cartItem.quantity;
    
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    
    totalItemPrice += itemPrice;
    totalShippingPrice += deliveryOption.priceCents;
    totalQuantity += cartItem.quantity;
  });

  let totalPriceCents = totalItemPrice+totalShippingPrice;
  let taxCents = totalPriceCents * 0.1;
  
  html += 
  `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalQuantity}):</div>
      <div class="payment-summary-money">$${formatCurrency(totalItemPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(totalShippingPrice)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalPriceCents+taxCents)}</div>
    </div>

    <button class="place-order-button button-primary
      js-place-order">
      Place your order
    </button>
 
  `;
  document.querySelector('.js-payment-summery').innerHTML = html;

  document.querySelector('.js-place-order').addEventListener('click', async ()=>{
    try{
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart
        })
      });
  
      const order = await response.json();
      addToOrder(order);
    } catch(error){
      console.error('Error placing order', error)
    }

    window.location.href = 'orders.html';
  });
}