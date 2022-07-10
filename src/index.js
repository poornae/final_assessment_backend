const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51LK5EdHB019YI8hNGTRdjW4SESip8KTFCpk5kOsRvMCA7AtKO6Pob1YoLuzwvrGJmvvhx5Fe4aNgU4hEbimTn5jk009rwd7Z8X"
);
const cors = require("cors");
const express = require("express");

// const stripe = require("stripe")("sk_test_51LJ5SiSDKIbcaRZBUtpaj3yh2vyvaBcEiqry7GS2zVbXsy1Qop23wcB7KGGCYfml16Z5m0LaWJFlZccWVIyXu3Dn00bwF8ioNP");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (REQ, RES) => {
  res.send("IT WORKS");
});

app.post("/payment", (req, res) => {
  const { product, token } = req.body;
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  // const idempontencyKey = uuid()

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create({
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: product.name,
      });
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
});

//listen
app.listen(3001, () => console.log("LISTENING AT PORT 3001"));
