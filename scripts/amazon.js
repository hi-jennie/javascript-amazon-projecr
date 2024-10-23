/*
main idea of JS
save data
generate HTML
make wev page interactive
*/
console.log('Hello, World!');

// save data
// const products = [
//   {
//     image: 'images/products/athletic-cotton-socks-6-pairs.jpg',
//     name: 'Black and Gray Athletic Cotton Socks - 6 Pairs',
//     rating: {
//       stars: 4.5,
//       count: 87
//     },
//     priceCents: 1090
//   }
// ];
// load data from the json file

// generate the HTML
let html = '';
products.forEach((product)=>{
  html += `
  <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${(product.rating.stars)*10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>
    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id=${product.id}>
      Add to Cart
    </button>
  </div>
`;
});

document.querySelector('.products-grid').innerHTML = html;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button)=>{
    button.addEventListener('click', ()=>{
      // this step coming from data-product-id=${product.id} in the button(attributes:attach data to element)
      // this attribute should start with data-; convert product-id to productId as the name of the attribute
      const productId = button.dataset.productId; 
      
      let matchingItem;

      cart.forEach((item)=>{
        if(item.productId === productId){
          matchingItem = item;
        }
      });
      if(matchingItem){
        matchingItem.quantity += 1;
      }else{
        cart.push({
          productId: productId,
          quantity: 1
        });
      }
      console.log(cart);
    });
  });

