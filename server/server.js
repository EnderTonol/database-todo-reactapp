var express = require("express");
var { MongoClient } = require("mongodb");
var cors = require("cors");
var BodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(express.json());
app.use(BodyParser.json())

const PORT = 5000;
const URI = "mongodb://localhost:27017";
const DataBaseName = "demo";
const CollectionName = "name";

let db, dbCollection;


MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    db = client.db(DataBaseName);
    dbCollection = db.collection(CollectionName);
    console.log("Database Connected!");
  })
  .catch((err) => console.error("MongoDB Connection Error:", err));

//GET METHOD
app.get("/api/get", async (req, res) => {
  try {
    if (!dbCollection) return res.status(500).json({ error: "Database not connected" });

    const users = await dbCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//POST METHOD
app.post("/add-name", async (req, res) => {
  try {
    if (!dbCollection) return res.status(500).json({ error: "Database not connected" });

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    await dbCollection.insertOne({ name });
    res.status(201).json({ message: "Name added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Patch Method
app.patch("/update-name/:name", async (req, res) => {
  try{
    if (!dbCollection) return res.status(500).json({ error: "Database not connected" });

    const { updateName } = req.body;
    if (!updateName) return res.status(400).json({ error: "Name is required" });

    await dbCollection.updateOne({ name: req.params.name },{ $set: { name: updateName } });
    res.status(201).json({ message: "Name updated successfully" });
  } catch(err){
    res.status(500).json({ error: "Internal Server Error" });
  }

});  

//Delete Method
app.delete("/del/users/:name", (req,res)=>{
  try{
    if (!dbCollection) return res.status(500).json({ error: "Database not connected" });

    dbCollection.deleteOne({ name: req.params.name });
    res.status(201).json({ message: "Name deleted successfully" });
  } catch(err){
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//listen to the server
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT} at http://localhost:${PORT}`);
});
