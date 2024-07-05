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
    socket.emit("client:product:create", { formData: product }, (res) => {
        if (res.status === "error") {
            console.error(`Unable to add product from form: ${res.payload}`);
            return;
        }

        console.log(`product:create ${res.payload}`);
    });

    // Clear form
    form.reset();
})

// Events
socket.on("server:product:load", (products) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
        productList.append(productUI(product));
    })

    console.log(products);
});

const productUI = (product) => {
    const div = document.createElement("div");
    div.innerHTML = `${product.title}`;
    div.setAttribute("id", product.id);

    return div;
}