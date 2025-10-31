import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/todoDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

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

app.get("/api/seed-defaults", async (req, res) => {
  const count = await Task.countDocuments();
  if (count === 0) {
    const defaultTasks = [
      {
        title: "Capture Saddam Hussein",
        description: "Saddam Hussein's playing hide and seek, find him",
        dueDate: "November 05, 2025",
        priority: "high",
        completed: false,
      },
      {
        title: "Fix the bug",
        description: "Fix the butterfly's wings",
        dueDate: "October 31, 2025",
        priority: "high",
        completed: false,
      },
      {
        title: "Hiking",
        description: "Hike mount apo with the spartans",
        dueDate: "October 31, 2025",
        priority: "medium",
        completed: false,
      },
      {
        title: "Attend the meeting",
        description: "Attend the google meet for the thesis consultation",
        dueDate: "November 04, 2025",
        priority: "medium",
        completed: false,
      },
      {
        title: "Join the seminar",
        description: "Join the seminar about gambling addiction",
        dueDate: "November 03, 2025",
        priority: "low",
        completed: false,
      },
    ];
    await Task.insertMany(defaultTasks);
    res.json({ message: "Default tasks seeded" });
  } else {
    res.json({ message: "Tasks already exist" });
  }
});

app.post("/api/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.listen(5000, () => console.log("Server running on port 5000"));
