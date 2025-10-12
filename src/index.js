import "./styles.css";
import { createBaseContent } from "./baseContent.js";
import { createDefaultProject } from "./defaultProject.js";
import { defaultProject, Project } from "./project.js";
import { createDefaultTasks } from "./defaultTasks.js";
import { addTask } from "./addTask.js";
import { createNewProject } from "./newProject.js";

const { content, projectContainer, projectWrapper, listAreaWrapper, listArea } =
  createBaseContent();

// Creating Default Project
const { projectDivision } = createDefaultProject(
  defaultProject.title,
  defaultProject.description,
  listArea
);
projectWrapper.appendChild(projectDivision);

// Input and button for adding task
const addTaskInput = document.createElement("input");
addTaskInput.placeholder = "Buy a new tank";
const addTaskBtn = document.createElement("button");
addTaskBtn.textContent = "Add Task";

content.appendChild(addTaskInput);
content.appendChild(addTaskBtn);

// Creating default task
let { taskItemIndex } = createDefaultTasks(listArea);

// Add task
addTaskBtn.addEventListener("click", () => {
  taskItemIndex++;
  addTask(taskItemIndex, defaultProject, addTaskInput.value, listArea);
});

// Create New Project Button
const newProjectDivisionBtn = document.createElement("button");
newProjectDivisionBtn.classList.add("new-project-btn");
newProjectDivisionBtn.textContent = "+ New Project";
content.appendChild(newProjectDivisionBtn);

// Create New Project
newProjectDivisionBtn.addEventListener("click", () => {
  createNewProject(projectWrapper, listArea);
});
