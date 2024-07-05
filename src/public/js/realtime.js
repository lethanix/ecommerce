
// Create socket connection 
const socket = io();

// Get the form information and send it to the server 
const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get the data and create a product object
    const data = new URLSearchParams(new FormData(form));

    fetch("/api/realtimeproducts", {
        method: "POST",
        body: data,
    }).then( _ => form.reset());

});

// Events
socket.on("server:product:added", (product) => {
    const productList = document.getElementById("product-list");

    const fragment = document.createDocumentFragment();

    fragment.appendChild(productUI(product));

    productList.appendChild(fragment);
});

/**
 * 
 * @param {Product} product - Creates the HTML element of a product
 * @returns {HTMLDivElement} div - Returns the div element created
 */
const productUI = (product) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = product.title;

    const button = document.createElement("button");
    button.setAttribute("data-id", product.id);
    button.innerHTML = "delete";

    div.append(p, button);

    return div;
}