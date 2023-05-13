'use strict';


// Navbar toggle

const navbar=document.querySelector("[data-navbar]")
const navbarLinks=document.querySelectorAll("[data-nav-link]")
const menuToggleBtn=document.querySelector("[data-nav-toggle-btn]")


menuToggleBtn.addEventListener('click',function(){
    navbar.classList.toggle("active")
    this.classList.toggle("active")
})

for(let i=0;i<navbarLinks.length;i++){
    navbarLinks[i].addEventListener("click",function(){
        navbar.classList.toggle("active")
        menuToggleBtn.classList.toggle("active")
    })
}

// Header Sticky and Back to top

const header=document.querySelector("[data-header]")
const backTopBtn=document.querySelector("[data-back-top-btn]")
window.addEventListener("scroll",function(){
    if(window.scrollY>=100)
    {
        header.classList.add("active")
        // backTopBtn.classList.add("active")   
    }
    else{
        header.classList.remove("active")
        // backTopBtn.classList.remove("active")
    }
})



// Search Box toggle

const searchBtn=document.querySelector("[data-search-btn]")
const searchContainer=document.querySelector("[data-search-container]")
const searchSubmitBtn=document.querySelector("[data-search-submit-btn]")
const searchCloseBtn=document.querySelector("[data-search-close-btn]")


const searchBoxElems=[searchBtn,searchSubmitBtn,searchCloseBtn]

for(let i=0;i<searchBoxElems.length;i++)
{
    searchBoxElems[i].addEventListener("click",function(){
        searchContainer.classList.toggle("active");
        document.body.classList.toggle("active");
    })
}


// CART

let cartIcon=document.querySelector("#cart-icon")
let cart=document.querySelector(".cart")
let closeCart=document.querySelector("#close-cart")

// Open Cart
cartIcon.onclick=()=>{
    cart.classList.add("active");
}
// Close Cart
closeCart.onclick=()=>{
    cart.classList.remove("active");
}

// Cart Working 

if(document.readyState=="loading")
{
    document.addEventListener("DOMContentLoaded",ready)
}
else{
    ready();
}

// Function

// Remove Items From Cart

function ready(){
    var removeCartButtons=document.getElementsByClassName("cart-remove")
    console.log(removeCartButtons)
    for(var i=0;i<removeCartButtons.length;i++)
    {
        var button=removeCartButtons[i]
        button.addEventListener("click",removeCartItem)
    }

    // Quantity Changes
    var quantityInputs=document.getElementsByClassName("cart-quantity")
    for(var i=0;i<quantityInputs.length;i++)
    {
        var input=quantityInputs[i]
        input.addEventListener("change",quantityChanged)
    }
    // add to cart
    var addCart=document.getElementsByClassName("add-cart")
    for(var i=0;i<addCart.length;i++){
        var button=addCart[i];
        button.addEventListener("click",addCartClicked)
    }

    //buy button 
    document.getElementsByClassName("btn-buy")[0].addEventListener("click",buyButtonClicked)


}

//buy button
function buyButtonClicked(){
    alert("Your order is placed")
    var cartContent=document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal()
}
function removeCartItem(event){
    var buttonClicked=event.target;
    buttonClicked.parentElement.remove();
    updatetotal()
}

// Quantity Changes

function quantityChanged(event){
    var input=event.target
    if(isNaN(input.value)||input.value<=0)
    {
        input.value=1
    }
    updatetotal();
}


// ADD To Cart

function addCartClicked(event){
    var button=event.target
    var shopProducts=button.parentElement
    var title=shopProducts.getElementsByClassName("product-title")[0].innerText
    var price=shopProducts.getElementsByClassName("price")[0].innerText
    var productImg=shopProducts.getElementsByClassName("product-img")[0].src
    addProductToCart(title,price,productImg);
    
    updatetotal();
}

// ADD product to cart

function addProductToCart(title,price,productImg){
    var cartShopBox=document.createElement("div")
    cartShopBox.classList.add("cart-box")
    var cartItems=document.getElementsByClassName("cart-content")[0]
    var cartItemsNames=cartItems.getElementsByClassName("cart-product-title")
    for(var i=0;i<cartItemsNames.length;i++)
    {
        if(cartItemsNames[i].innerText==title){
        alert("You have already added this item");
        return;
        }
    }

    var cartBoxContent=`
                    <img src="${productImg}" class="cart-img" alt="">
                        
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <input type="number" value="1" class="cart-quantity">
                    </div>

                    <ion-icon name="trash-outline" class="cart-remove"></ion-icon>
                    `;

    cartShopBox.innerHTML=cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",quantityChanged);

}
// Update Total

function updatetotal(){
    var cartContent=document.getElementsByClassName("cart-content")[0]
    var cartBoxes=cartContent.getElementsByClassName("cart-box")

    var total=0;

    for(var i=0;i<cartBoxes.length;i++){
        var cartBox=cartBoxes[i]
        var priceElement=cartBox.getElementsByClassName("cart-price")[0]
        var quantityElement=cartBox.getElementsByClassName("cart-quantity")[0]
        var distance=cartBox.getElementsByClassName("distance")[0]
        console.log(distance)
        var price=parseFloat(priceElement.innerText.replace("$",""))
        var quantity=quantityElement.value;
        total=total+price*quantity
    }
        // Price For Cents Value
        total=Math.round(total*100)/100;
        document.getElementsByClassName("total-price")[0].innerText="€"+total;
}





