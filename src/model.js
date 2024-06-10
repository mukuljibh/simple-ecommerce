import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    Name: {
        type: String,
    },
    Description: {
        type: String,
    },
    Image: {
        type: String
    },
    Price: {
        type: String
    },
    Type: {
        type: String
    },
});

const productDetails = mongoose.model(
    "productDetails",
    Schema,
);

export { productDetails };