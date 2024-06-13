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
    socket.emit("submit-product", { formData: product });

    // Clear form
    form.reset();
})

// Events
socket.on("new product added", async (data) => {
    console.log(`New product added: ${JSON.stringify(data, null,"\t")}`);
});

socket.on("error adding product", async (data) => {
    console.error(`Unable to add product from form: ${JSON.stringify(data)}`);
})
