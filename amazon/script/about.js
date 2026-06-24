const products = [
{
id:'1',
name:'Wireless Mouse',
price:19.99,
rating:4.5,
image:'https://picsum.photos/300?1'
},
{
id:'2',
name:'Mechanical Keyboard',
price:59.99,
rating:4.8,
image:'https://picsum.photos/300?2'
},
{
id:'3',
name:'Gaming Headset',
price:39.99,
rating:4.4,
image:'https://picsum.photos/300?3'
},
{
id:'4',
name:'USB-C Hub',
price:29.99,
rating:4.2,
image:'https://picsum.photos/300?4'
},
{
id:'5',
name:'Webcam HD',
price:49.99,
rating:4.6,
image:'https://picsum.photos/300?5'
},
{
id:'6',
name:'Laptop Stand',
price:24.99,
rating:4.7,
image:'https://picsum.photos/300?6'
}
];

let compareProducts = [];

renderProducts(products);

function renderProducts(productsToRender){

let html = '';

productsToRender.forEach((product)=>{

html += `
<div class="product-card">

<img src="${product.image}">

<div class="product-name">
${product.name}
</div>

<div class="price">
$${product.price}
</div>

<div class="rating">
⭐ ${product.rating}
</div>

<button
class="js-compare-button"
data-product-id="${product.id}">
Add To Compare
</button>

</div>
`;
});

document.querySelector('.js-products-grid').innerHTML = html;

attachCompareEvents();
}

function attachCompareEvents(){

document.querySelectorAll('.js-compare-button')
.forEach((button)=>{

button.addEventListener('click',()=>{

const productId = button.dataset.productId;

const product = products.find(
item => item.id === productId
);

const exists = compareProducts.find(
item => item.id === productId
);

if(exists){
alert('Already added');
return;
}

if(compareProducts.length >= 3){
alert('Maximum 3 products');
return;
}

compareProducts.push(product);

renderComparison();

});
});
}

function renderComparison(){

const container =
document.querySelector('.js-comparison-container');

if(compareProducts.length === 0){

container.innerHTML = `
<p class="empty-message">
No products selected.
</p>
`;

return;
}

const cheapestPrice = Math.min(
...compareProducts.map(
product => product.price
)
);

let tableHtml = `
<table class="compare-table">

<tr>
<th>Feature</th>
`;

compareProducts.forEach(product=>{

tableHtml += `
<th>
${product.name}
</th>
`;
});

tableHtml += '</tr>';

tableHtml += `
<tr>
<td>Price</td>
`;

compareProducts.forEach(product=>{

tableHtml += `
<td class="${
product.price === cheapestPrice
? 'highlight'
: ''
}">
$${product.price}
</td>
`;
});

tableHtml += '</tr>';

tableHtml += `
<tr>
<td>Rating</td>
`;

compareProducts.forEach(product=>{

tableHtml += `
<td>
⭐ ${product.rating}
</td>
`;
});

tableHtml += '</tr>';

tableHtml += `
<tr>
<td>Action</td>
`;

compareProducts.forEach(product=>{

tableHtml += `
<td>

<button
onclick="removeProduct('${product.id}')">
Remove
</button>

</td>
`;
});

tableHtml += `
</tr>
</table>
`;

container.innerHTML = tableHtml;

updateStats();
}

function removeProduct(productId){

compareProducts =
compareProducts.filter(
product => product.id !== productId
);

renderComparison();
}

function updateStats(){

const stats =
document.querySelector('.js-stats');

if(compareProducts.length === 0){

stats.innerHTML = '';
return;
}

const averagePrice =
(
compareProducts.reduce(
(sum,product)=>
sum + product.price,
0
)
/
compareProducts.length
).toFixed(2);

const averageRating =
(
compareProducts.reduce(
(sum,product)=>
sum + product.rating,
0
)
/
compareProducts.length
).toFixed(1);

stats.innerHTML = `
<h3>Comparison Statistics</h3>

<p>
Average Price:
<strong>$${averagePrice}</strong>
</p>

<br>

<p>
Average Rating:
<strong>${averageRating} ⭐</strong>
</p>

<br>

<p>
Products Compared:
<strong>
${compareProducts.length}
</strong>
</p>
`;
}

document
.querySelector('.js-search')
.addEventListener('input',(event)=>{

const searchText =
event.target.value.toLowerCase();

const filteredProducts =
products.filter((product)=>{

return product.name
.toLowerCase()
.includes(searchText);

});

renderProducts(filteredProducts);

});