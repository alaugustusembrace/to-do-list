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

app.get("/api/defaultProject/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.get("/api/defaultProject/seed-defaults", async (req, res) => {
  const count = await Task.countDocuments();
  if (count === 0) {
    const defaultTasks = [
      {
        title: "Capture Saddam Hussein",
        description: "Saddam Hussein's playing hide and seek, find him",
        dueDate: "2025-11-05",
        priority: "high",
        completed: false,
      },
      {
        title: "Fix the bug",
        description: "Fix the butterfly's wings",
        dueDate: "2025-10-31",
        priority: "high",
        completed: false,
      },
      {
        title: "Hiking",
        description: "Hike mount apo with the spartans",
        dueDate: "2025-10-31",
        priority: "medium",
        completed: false,
      },
      {
        title: "Attend the meeting",
        description: "Attend the google meet for the thesis consultation",
        dueDate: "2025-11-04",
        priority: "medium",
        completed: false,
      },
      {
        title: "Join the seminar",
        description: "Join the seminar about gambling addiction",
        dueDate: "2025-11-03",
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

app.post("/api/defaultProject/tasks", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

app.put("/api/defaultProject/tasks/:id", async (req, res) => {
  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updateTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updateTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/defaultProject/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", deletedTask });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, (err) => {
  if (err) console.log(err);
  console.log("Server running on port 5000");
});
