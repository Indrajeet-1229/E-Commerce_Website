const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/Product");
const app = express();
const port=5000 || process.env.PORT;
const path=require('path')

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'./fronend/build')));


app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
})

app.get("/", (req, res) => {
    res.send("port is in working..");
});

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            // console.log(user)
            res.send(user);
        }
        else {
            res.send({ result: "No user Found" });
        }
    }
});

app.post("/add-product", async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);

});

app.get("/products", async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    } else {
        res.send({ result: "No product found" });
    }
});

app.delete("/product/:id", async (req, res) => {

    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);

});

app.get("/product/:id", async (req, res) => {

    const result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result);
    } else {
        res.send({ result: "No Record found" });
    }

});

app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result);
});
app.get("/search/:key", async(req,res)=>{
    let result=await Product.find({
        "$or":[
            {name:{}}
        ]
    })
})


app.listen(port, (err) => {
    console.log(err);
    console.log("Port is working at 5000...");
});