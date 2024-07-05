// Create socket connection 
const socket = io();

// Get the form information and send it to the server 
const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
    // Get the data and create a product object
    const formData = new FormData(form);

    const product = {};
    for (const [key, value] of formData) {
        product[key] = value;
    }

    // Send message
    socket.emit("submit-product", {formData: product});

})
