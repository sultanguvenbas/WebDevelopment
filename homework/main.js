console.log("Running");
let carts= document.querySelectorAll('.add-cart');

let products = [
  {
    name: '7 Kırmızı Gül',
    tag:'7 Kırmızı Gül',
    price:69,
    inCart:0
  },
  {
    name: 'Doğal Ahşap Kütükte Papatya Aranjmanı',
    tag:'Doğal Ahşap Kütükte Papatya Aranjmanı',
    price:49,
    inCart:0
  },
  {
    name: 'Pembe Rüyalar Karanfil Aranjmanı',
    tag:'Pembe Rüyalar Karanfil Aranjmanı',
    price:79,
    inCart:0
  },
  {
    name: 'Orkideler',
    tag:'Orkideler',
    price:64,
    inCart:0
  },
  {
    name: 'Papatya Karnavalı',
    tag:'Papatya Karnavalı',
    price:69,
    inCart:0
  },
  {
    name: 'Lilyum Aranjmanı',
    tag:'Lilyum Aranjmanı',
    price:74,
    inCart:0
  },
  {
    name: 'Aşk Pembesi Gerberalar',
    tag:'Aşk Pembesi Gerberalar',
    price:59,
    inCart:0
  },
  {
    name: 'Sevgi Bahçesi 11 Kırmızı Gül',
    tag:'Sevgi Bahçesi 11 Kırmızı Gül',
    price:79,
    inCart:0
  },
  {
    name: 'Kütükte Çiçek Bahçesi',
    tag:'Kütükte Çiçek Bahçesi',
    price:59,
    inCart:0
  },
  {
    name: 'Papatya Bahçesi',
    tag:'Papatya Bahçesi',
    price:65,
    inCart:0
  },
  {
    name: '9 Beyaz Gül Aranjmanı',
    tag:'9 Beyaz Gül Aranjmanı',
    price:79,
    inCart:0
  },
  {
    name: 'Doğal Ahşap Kütükte Renkli Papatya Aranjmanı',
    tag:'Doğal Ahşap Kütükte Renkli Papatya Aranjmanı',
    price:59,
    inCart:0
  },
  {
    name: '2 Dal Beyaz Orkide Çiçeği',
    tag:'2 Dal Beyaz Orkide Çiçeği',
    price:139,
    inCart:0
  },
  {
    name: 'Kar Beyaz Gül ve Lilyum',
    tag:'Kar Beyaz Gül ve Lilyum',
    price:129,
    inCart:0
  },
  {
    name: 'Bahar Büyüsü Sarı Gerberalar',
    tag:'Bahar Büyüsü Sarı Gerberalar',
    price:59,
    inCart:0
  }
];

for(let i=0; i < carts.length; i++){
  // console.log("my loop");
  carts[i].addEventListener('click',() => {
    // console.log("added to cart");
    cardNumbers(products[i]);
    totalCost(products[i]);
  })
}

function onLoadCartNumbers() {
  //check local storage
  let productNumbers=localStorage.getItem('cardNumbers');
  if (productNumbers){
    document.querySelector('.user-menu_title span').textContent =productNumbers;
  }
}

function cardNumbers(product) {
  // console.log('Product', product);
  let productNumbers=localStorage.getItem('cardNumbers');
  // console.log(productNumbers);
  // console.log(typeof productNumbers); //string so convert to integer
  productNumbers = parseInt(productNumbers);


  if(productNumbers ){
    localStorage.setItem('cardNumbers',productNumbers + 1);
    document.querySelector('.user-menu_title span').textContent =productNumbers + 1;
  }else {
    localStorage.setItem('cardNumbers', 1);
    document.querySelector('.user-menu_title span').textContent =1;
  }
  setItems(product);
}

function setItems(product) {
  // console.log('inside of function',product);

  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems); //converting to normal js format
  console.log('cart items are', cartItems);

  if (cartItems !== null){ //means something already existed
    // console.log(cartItems[product.tag]); it is undefined we click ones
    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems, //object means
        [product.tag]:product
      }
    }
    cartItems[product.tag].inCart += 1;

  }else{
    product.inCart = 1;
    cartItems={
      [product.tag]: product //it retuns object,object so we need to json
    }
  }
  localStorage.setItem('productsInCart',JSON.stringify(cartItems));
}

function totalCost(product) {
  // console.log('price is ',product.price);
  let cartCost = localStorage.getItem('totalCost');
  // console.log('cost is',cartCost);
  //whenever we get the value from localstorage it will be string

  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost',cartCost + product.price);
  }else{
    localStorage.setItem('totalCost',product.price);
  }

}

function displayCart() {
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  // console.log(cartItems);
  let productContainer = document.querySelector('.products');
  let cartCost = localStorage.getItem('totalCost');
  if(cartItems && productContainer){ //we are checking there are in the basket page or not
    // console.log('test')
    productContainer.innerHTML = '';
    // we used map because we dont wanna check all of things just name price e.t.c.
    Object.values(cartItems).map(item => {
      productContainer.innerHTML += `
      <div class="product">
        <ion-icon name="close-circle"></ion-icon>
        <img src="./images/${item.tag}.png">
        <span >${item.name}</span>
       </div>
       <div class="price">$${item.price},00 </div>
       <div class="quantity">
        <span>${item.inCart}</span>
        </div>
       <div class="total">
           $${item.inCart * item.price},00
       </div>
      `
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
          <h4 class="basketTotalTitle">Basket Total</h4>
          <h4 class="basketTotal">$${cartCost},00</h4>
      </div>
    `
  }
}

onLoadCartNumbers();
displayCart();
