//data structure for each product so as to iterate through each product
//combining all the html 
let productsHTML ='';

products.forEach((product)=>{
  productsHTML +=
  `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          $${(product.priceCents / 100).toFixed(2)}
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

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
})


//showing in the html ok 
document.querySelector('.js-products-grid').innerHTML = productsHTML;

//this is best for to loop through our each cart content using data attributes 
//in the html the syntax for the data attributes is data-box-quantity which is camel case.
document.querySelectorAll('.js-add-to-cart').
forEach((button) => {
  button.addEventListener('click', () =>{
    const productId = button.dataset.productId;

    //ewe are going to iterate through each element in the array and then it found we append but 
    //but if new we jsut pus it 
    let matchingItem;
    cart.forEach((item)=>{
      if(productId === item.productId){
        matchingItem = item;
      }
    });

    if(matchingItem){
      matchingItem.quantity +=1;
    }else{
      cart.push({
      productId:productId,
      quantity:1
    });
    }


//for cart qunatity to show ok 
    let cartQuantity = 0;
    cart.forEach((item)=>{
      cartQuantity += item.quantity;
    })

    //changing the html element inside by using queryselector 
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  });

});


