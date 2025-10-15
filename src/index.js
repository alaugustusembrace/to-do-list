import "./styles.css";
import { createBaseContent } from "./baseContent.js";
import { createDefaultProject } from "./defaultProject.js";
import { defaultProject, Project } from "./project.js";
import { createDefaultTasks } from "./defaultTasks.js";
import { addTask } from "./addTask.js";
import { createNewProject } from "./newProject.js";

const { content, projectContainer, projectWrapper, listAreaWrapper, listArea } =
  createBaseContent();

// Creating Default Tasks
let { taskItemIndex } = createDefaultTasks(listArea);

// Creating Default Project
const { projectDivision } = createDefaultProject(
  taskItemIndex,
  defaultProject.title,
  defaultProject.description,
  listArea,
  content, // passing content argument 10/14/2025 7:17AM
  defaultProject
);
projectWrapper.appendChild(projectDivision);

// Create Input and button for adding task
// const addTaskInput = document.createElement("input");
// addTaskInput.placeholder = "Buy a new tank";
// const addTaskBtn = document.createElement("button");
// addTaskBtn.textContent = "Add Task";

// content.appendChild(addTaskInput);
// content.appendChild(addTaskBtn);

// Creating default task
// let { taskItemIndex } = createDefaultTasks(listArea);

// Add task              <--------------- COMMENTED FOR NOW 10/14/2025 7:19 --------------->
// addTaskBtn.addEventListener("click", () => {
//   taskItemIndex++;
//   addTask(taskItemIndex, defaultProject, addTaskInput.value, listArea);
// });

// Create New Project Button
const newProjectDivisionBtn = document.createElement("button");
newProjectDivisionBtn.classList.add("new-project-btn");
newProjectDivisionBtn.textContent = "+ New Project";
content.appendChild(newProjectDivisionBtn);

// Create New Project
newProjectDivisionBtn.addEventListener("click", () => {
  createNewProject(projectWrapper, listArea);
});
