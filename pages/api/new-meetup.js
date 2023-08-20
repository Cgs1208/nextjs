import { MongoClient } from "mongodb";
//api/new-meetup

async function Handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://charan:Mangodbpass@cluster0.gg6vjr2.mongodb.net/?retryWrites=true&w=majority"
    );
    //never do this connect method in other component because you will expose it to users
    //so always add these in api routes which are not visible to users

    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    client.close();

    res.status(201).json({ message: "meetup inserted" });
  }
}

export default Handler;
