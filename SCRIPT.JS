let selectedStripeLink = "";

const sizeButtons = document.querySelectorAll(".size-btn");

sizeButtons.forEach(button => {

    button.addEventListener("click", () => {

        sizeButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        selectedStripeLink = button.dataset.link;

    });

});


const checkoutBtn = document.getElementById("checkoutBtn");

checkoutBtn.addEventListener("click", () => {

    if(selectedStripeLink === ""){

        alert("Please select a size.");

        return;

    }

    window.location.href = selectedStripeLink;

});


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