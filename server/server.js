import express, { response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import { Book } from "./model/bookModel.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

const mongodbURL =
  "mongodb+srv://root:root@learn-db.xako9zs.mongodb.net/?retryWrites=true&w=majority&appName=learn-db";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(201).send(books);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (book) {
      res.status(201).send("Deleted successfully");
    } else {
      res.status(400).send("no book of such id found");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }
    const newbook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newbook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error);
  }
});

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log("connected to db");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// File upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req);
  console.log(req.file);
  res.json(req.file.filename);
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
