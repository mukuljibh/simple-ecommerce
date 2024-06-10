import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { productDetails } from "./backend/model.js"
import cors from "cors";

const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors()); //for cross generation support

app.use(bodyParser.urlencoded({ extended: true })); // middleware which fetches the form data
const CONNNECTIONSTRING = "mongodb+srv://mukul:8368555400@dribbblecluster.xnwg76a.mongodb.net/productDB?retryWrites=true&w=majority&appName=dribbblecluster";
function connectToDatabase() {
    //make sure that server open only when database is available
    return new Promise((resolve, reject) => {
        mongoose
            .connect(CONNNECTIONSTRING)
            .then(() => {
                resolve("Connected successfully to Database");
            })
            .catch((err) => {
                console.log(err)
                reject(`Database unreachable`);
            });
    });
}

app.get("/search", (req, res) => {
    const searchString = req.query.qwery
    const regex = new RegExp(searchString, 'i'); // 'i' makes it case-insensitive
    productDetails.find({ Description: regex })
        .then((data) => {
            res.status(201).json({ msg: data });
        })
        .catch(() => {
            res.status(501).json({ msg: "something goes wrong" });
        });
})


app.post("/load", async (req, res) => {
    const obj = req.body
    const person = new productDetails(obj);
    person.save()
        .then(() => {
            res.status(201).json({ msg: "Success" });
        })
        .catch((error) => {
            res.status(500)
                .json({ error: `Error saving data: ${error.message}` });
        });

})


app.listen(port, () => {
    connectToDatabase()
        .then((msg) => {
            console.log(msg);
            console.log(`server starting runining on port ${port}`);
        })
        .catch((err) => {
            console.log(err);
        });
});