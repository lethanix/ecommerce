const socket = io();

const form = document.getElementById("form");

function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(event.target);

  // Create an object with the values to send
  const product = Object.fromEntries(data.entries());
  product.price = Number(product.price);
  product.stock = Number(product.stock);
  product.status = Boolean(product.status);

  // Clear form values
  event.target.reset();

  // Send information to server
  socket.emit("add product", product);
}

form.addEventListener("submit", handleSubmit);
