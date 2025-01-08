require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// Middolewere.
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wov5r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const moviePortal = client.db("movieDB").collection("movie");
    const favmovies = client.db("favmovieDB").collection("favouriteMovies");

    // Get Data from DB
    app.get("/movies", async (req, res) => {
      const cursor = moviePortal.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get favorite Movies Data
    app.get("/favorite", async (req, res) => {
      const cursor = favmovies.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // get data by ID
    app.get('/movies/:id', async(req,res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await moviePortal.findOne(query);
      res.send(result);
    })

    // Add New Data
    app.post("/movies", async (req, res) => {
      const newUser = req.body;
      const result = await moviePortal.insertOne(newUser);
      res.send(result);
    });

    // Add New favourite Movies Data
    app.post("/favorite", async (req, res) => {
      const newFav = req.body;
      const result = await favmovies.insertOne(newFav);
      res.send(result);
    });

    // Delete Data
    app.delete("/movies/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await moviePortal.deleteOne(query);
      res.send(result);
    });

    // Delete Data from favorite
    app.delete("/favorite/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await favmovies.deleteOne(query);
      res.send(result);
    });

    // Update Data
    app.put("/movies/:id", async (req, res) => {
      const id = req.params.id;
      const updatedMovie = req.body;
      const options = { upsert: true };
      const filter = {
        _id: new ObjectId(id),
      };

      const movie = {
        $set: {
          poster: updatedMovie.poster,
          title: updatedMovie.title,
          genre: updatedMovie.genre,
          duration: updatedMovie.duration,
          rating: updatedMovie.rating,
          releaseYear: updatedMovie.releaseYear,
          summery: updatedMovie.summery
        },
      };
      const result = await moviePortal.updateOne(filter, movie, options);
      res.send(result);
    });
    console.log(
      "You successfully connected to MongoDB!"
    );
  } finally {

  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Movie Server Running.");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
