const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
const cors = require("cors");

const stripe = require("stripe")(
  "sk_test_51Q5hv0SI3jQWKAjiNiauaaWfIJ4fYcd1pddcNb3d9QvIvKsb1jSNT3gina2GT8YRQ5iUJIVVsyQya6bSGNuQMqXK00jJ4tKy3d"
);

const uri =
  "mongodb+srv://admin:admin@project1.khmts.mongodb.net/?retryWrites=true&w=majority&appName=project1";

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const postcollection = client.db("database").collection("posts");
    const usercollection = client.db("database").collection("users");
    app.post("/register", async (req, res) => {
      const user = req.body;
      // console.log(user)
      const result = await usercollection.insertOne(user);
      res.send(result);
    });
    app.get("/loggedinuser", async (req, res) => {
      const email = req.query.email;
      const user = await usercollection.find({ email: email }).toArray();
      res.send(user);
    });
    app.post("/post", async (req, res) => {
      const post = req.body;
      const result = await postcollection.insertOne(post);
      res.send(result);
    });
    app.get("/post", async (req, res) => {
      const post = (await postcollection.find().toArray()).reverse();
      res.send(post);
    });
    app.get("/userpost", async (req, res) => {
      const email = req.query.email;
      const post = (
        await postcollection.find({ email: email }).toArray()
      ).reverse();
      res.send(post);
    });

    app.get("/user", async (req, res) => {
      const user = await usercollection.find().toArray();
      res.send(user);
    });

    app.patch("/userupdate/:email", async (req, res) => {
      const filter = req.params;
      const profile = req.body;
      const options = { upsert: true };
      const updateDoc = { $set: profile };
      // console.log(profile)
      const result = await usercollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });
    app.post("/create-checkout-session", async (req, res) => {
      const { plan, email } = req.body;
      const plans = {
        free: { price: 0, tweets: 1 },
        bronze: { price: 100, tweets: 3 },
        silver: { price: 300, tweets: 5 },
        gold: { price: 1000, tweets: "unlimited" },
      };

      const selectplan = plans[plan];
      if (!selectplan) {
        return res.status(400).json({ error: "Invalid plan selected" });
      }

      const lineItems = [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan`,
              description: `This plan allows you to post ${selectplan.tweets} tweets.`,
            },
            unit_amount: selectplan.price * 100,
          },
          quantity: 1,
        },
      ];

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `http://localhost:3000/cancel`,
          billing_address_collection: "required",
          shipping_address_collection: {
            allowed_countries: ["IN"],
          },
        });

        res.json({ id: session.id });
      } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Something went wrong" });
      }
    });
    app.get("/success", async (req, res) => {
      res.send("Subscribed successfully");
    });

    app.get("/cancel", (req, res) => {
      res.redirect("/");
    });
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Twiller is working");
});

app.listen(port, () => {
  console.log(`Twiller clone is workingon ${port}`);
});
