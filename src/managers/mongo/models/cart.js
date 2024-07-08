import mongoose from "mongoose";

const collection = "Carts";

const schema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products",
        },
        quantity: Number,
    }],
});

const cartModel = new mongoose.model(collection, schema);

export default cartModel;