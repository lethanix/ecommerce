import mongoose from "mongoose";

const collection = "Carts";

const schema = new mongoose.Schema({

})

const cartModel = new mongoose.model(collection, schema);

export default cartModel;