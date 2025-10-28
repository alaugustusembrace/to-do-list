import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017//todoDB");

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: String,
  priority: String,
  completed: { type: Boolean, default: false },
});

const Task = mongoose.model("Task", taskSchema);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.listen(5000, () => console.log("Server running on port 5000"));
