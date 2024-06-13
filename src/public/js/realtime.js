// Create socket connection 
const socket = io();

// Get the form information and send it to the server 
const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Get the data and create a product object
    const formData = new FormData(form);

    // Clean the input data
    const product = {};
    for (const [key, value] of formData) {
        product[key] = value;
    }

    product.status = product.status === "on";
    product.stock = Number(product.stock);

    // Send message
    socket.emit("submit-product", { formData: product }, (res) => {
        if (res.status === "error") {
            console.error(`Unable to add product from form: ${res.payload}`);
            return;
        }

        console.log(`Product:create ${res.payload}`);
    });

    // Clear form
    form.reset();
})
