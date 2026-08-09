let selectedSize = "";

const sizeButtons = document.querySelectorAll(".size-btn");

sizeButtons.forEach(button => {

    button.addEventListener("click", () => {

        sizeButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedSize = button.dataset.size;

    });

});  










const addToCartBtn = document.getElementById("addToCartBtn");

if (addToCartBtn) {

    addToCartBtn.addEventListener("click", () => {

        if (selectedSize === "") {
            alert("Please select a size.");
            return;
        }

        const productElement = document.querySelector(".product");

        const product = {

            name: productElement.dataset.name,
            price: Number(productElement.dataset.price),
            image: productElement.dataset.image,
            size: selectedSize,
            quantity: 1

        };

        addToCart(product);

    });

}











// Get the current cart
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save the cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Add a product
function addToCart(product) {

    let cart = getCart();

    // Check if the same product and size already exist
    const existing = cart.find(item =>
        item.name === product.name &&
        item.size === product.size
    );

    if (existing) {

        existing.quantity++;

    } else {

        cart.push(product);

    }

    saveCart(cart);

updateCartCount();

displayCart();

alert(product.name + " added to cart.");
}

// Update cart number in menu
function updateCartCount() {

    const cart = getCart();

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    const cartCounter = document.getElementById("cart-count");

    if (cartCounter) {

        cartCounter.textContent = total;

    }

}









const accordions = document.querySelectorAll(".accordion");

accordions.forEach(item => {

    const button = item.querySelector(".accordion-btn");

    const content = item.querySelector(".accordion-content");

    const icon = button.querySelector("span");

    button.addEventListener("click", () => {

        if(content.style.maxHeight){

            content.style.maxHeight = null;

            icon.textContent = "+";

        }else{

            content.style.maxHeight = content.scrollHeight + "px";

            icon.textContent = "−";

        }

    });

});















function displayCart() {

    const cart = getCart();

    const cartItems = document.getElementById("cart-items");

    const totalElement = document.getElementById("cart-total");

    if (!cartItems) return;

cartItems.innerHTML = "";

    if (cart.length === 0) {

    cartItems.innerHTML = `
        <P>Your cart is empty.</P>

        <a href="PAGE2.HTML">
            CONTINUE SHOPPING
        </a>
    `;

    totalElement.innerHTML = "";

    return;

}

    let total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img src="${item.image}" width="100">

            <h3>${item.name}</h3>

            <p>Size: ${item.size}</p>

            <div class="quantity-controls">

<button onclick="decreaseQuantity(${index})">−</button>

<span>${item.quantity}</span>

<button onclick="increaseQuantity(${index})">+</button>

</div>

            <p>$${item.price * item.quantity}</p>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    totalElement.innerHTML = `<h2>Total: $${total}</h2>`;

}



function removeItem(index){

    let cart = getCart();

    cart.splice(index,1);

    saveCart(cart);

    updateCartCount();

    displayCart();

}





function increaseQuantity(index) {

    let cart = getCart();

    cart[index].quantity++;

    saveCart(cart);

    updateCartCount();

    displayCart();

}

function decreaseQuantity(index) {

    let cart = getCart();

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart(cart);

    updateCartCount();

    displayCart();

}







updateCartCount();

displayCart();






const checkoutBtn = document.getElementById("checkoutBtn");

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", checkout);

}



async function checkout() {

    const cart = getCart();

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    try {

        const response = await fetch("/api/create_checkout_session", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                items: cart
            })

        });


        const data = await response.json();

        console.log("STATUS:", response.status);
        console.log("RESPONSE:", data);


        if(data.url){

            window.location.href = data.url;

        } else {

            alert(data.error);

        }


    } catch(error){

        console.error("CHECKOUT ERROR:", error);

        alert("Unable to start checkout.");

    }

}