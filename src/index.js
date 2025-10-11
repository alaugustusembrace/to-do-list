import "./styles.css";
import { createBaseContent } from "./baseContent.js";
import { createDefaultProject } from "./defaultProject.js";
import { defaultProject } from "./project.js";
import { createDefaultTasks } from "./defaultTasks.js";
import { addTask } from "./addTask.js";
import { createNewProject } from "./newProject.js";

const { content, projectContainer, projectWrapper, listAreaWrapper, listArea } =
  createBaseContent();

// Creating Default Project
const { projectDivision } = createDefaultProject(
  defaultProject.title,
  defaultProject.description
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
const newProjectDivision = document.createElement("button");
newProjectDivision.classList.add("new-project-btn");
newProjectDivision.textContent = "+ New Project";
content.appendChild(newProjectDivision);

// Create New Project
newProjectDivision.addEventListener("click", () => {
  createNewProject(
    defaultProject.title,
    defaultProject.description,
    projectWrapper
  );
});
