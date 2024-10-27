import {renderOrderSummery} from '../../../scripts/checkout/orderSummery.js';
import {loadFromStorage, removeFromCart,cart} from '../../../data/cart.js';
import { loadProducts } from '../../../data/products.js';
// this is an integration test for the order page
// 2 things to test:
// how the page looks and how page behaves;

describe('test suite: renderOrderSummery',()=>{
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
  // load the products before the test
  beforeAll((done)=>{
    loadProducts(()=>{
      done();
    });
  });

  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    // when renderOrderSummery(), will replace the corresponding js-cart-summery down below
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-cart-summery"></div>
      <div class="js-payment-summery"></div>
    `;
    
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: '1'
        }, {
          productId: productId2,
          quantity: 2,
          deliveryOptionId: '2'
        }
      ]);
    });
    loadFromStorage();
    renderOrderSummery();
  })

  // check if the page display correctly
  it('display the cart', ()=>{
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 1');

    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 2');
  });

  it('removes a product', ()=>{  
    // this is to mock the delete behavior;
    document.querySelector(`.js-delete-link-${productId1}`).click();

    // because after clicking the delete button, the function will call renderPayment() function, which including insert the new page into the .js-payment-summery container. Therefore, we need to create an new container in the .js-test-container to mock the js-payment-summery container
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    
    expect(document.querySelector(`.js-product-quantity-${productId1}`)).toEqual(null);

    expect(document.querySelector(`.js-product-quantity-${productId2}`)).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
  });

  afterEach(()=>{
    document.querySelector('.js-test-container').innerHTML = '';
  })
});