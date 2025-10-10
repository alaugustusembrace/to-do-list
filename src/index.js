import "./styles.css";
import { createBaseContent } from "./baseContent.js";
import { defaultProject } from "./project.js";
import { createDefaultTasks } from "./defaultTasks.js";

// Creating Project
const projectDivision = document.createElement("button");
projectDivision.classList.add("projectDivision");
const projectTitle = document.createElement("h2");
const projectDescription = document.createElement("p");
projectTitle.textContent = defaultProject.title;
projectDescription.textContent = defaultProject.description;
projectDivision.appendChild(projectTitle);
projectDivision.appendChild(projectDescription);

const { projectWrapper, listAreaWrapper, listArea } = createBaseContent();

// projectWrapper.appendChild(projectDivision);
// listAreaWrapper.appendChild(listArea);

// projectContainer.append(projectWrapper, listAreaWrapper);

// content.appendChild(projectContainer);

// Input and button for adding task
const addTaskInput = document.createElement("input");
addTaskInput.placeholder = "Buy a new tank";
const addTaskBtn = document.createElement("button");
addTaskBtn.textContent = "Add Task";

content.appendChild(addTaskInput);
content.appendChild(addTaskBtn);

// Creating default task
createDefaultTasks(listArea);

// Add task
addTaskBtn.addEventListener("click", () => {
  const taskItem = document.createElement("li");
  taskItemIndex++;
  taskItem.dataset.id = taskItemIndex;
  defaultProject.tasks.push({ id: taskItemIndex, text: addTaskInput.value });
  const taskContainer = document.createElement("div");
  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.textContent = "X";
  taskContainer.classList.add("taskContainer");
  taskContainer.textContent = addTaskInput.value;
  taskContainer.appendChild(removeTaskBtn);
  taskItem.appendChild(taskContainer);
  listArea.appendChild(taskItem);

  // Remove task
  removeTaskBtn.addEventListener("click", (e) => {
    const listItem = e.target.closest("li");
    defaultProject.tasks = defaultProject.tasks.filter(
      (item) => item.id !== Number(listItem.dataset.id)
    );

    listItem.remove();
  });
});

// Create New Project
const newProjectDivision = document.createElement("button");
newProjectDivision.classList.add("new-project-btn");
newProjectDivision.textContent = "+ New Project";
content.appendChild(newProjectDivision);

newProjectDivision.addEventListener("click", () => {
  const projectDialog = document.createElement("dialog");
  projectDialog.classList.add("project-dialog");
  const projectTitleInput = document.createElement("input");
  projectTitleInput.classList.add("title-input");
  const projectDescriptionInput = document.createElement("input");
  projectDescriptionInput.classList.add("desc-input");

  const projectDialogHeader = document.createElement("h2");
  projectDialogHeader.textContent = "New Project";

  projectTitleInput.placeholder = "Project Title";
  projectDescriptionInput.placeholder = "Project Description";

  projectDialog.appendChild(projectDialogHeader);
  projectDialog.appendChild(projectTitleInput);
  projectDialog.appendChild(projectDescriptionInput);
  content.appendChild(projectDialog);

  const createProjectBtn = document.createElement("button");
  createProjectBtn.textContent = "Create Project";
  projectDialog.appendChild(createProjectBtn);

  createProjectBtn.addEventListener("click", () => {
    const projectDivision = document.createElement("button");
    projectDivision.classList.add("projectDivision");
    const projectTitle = document.createElement("h2");
    const projectDescription = document.createElement("p");
    projectTitle.textContent = defaultProject.title;
    projectDescription.textContent = defaultProject.description;
    projectDivision.appendChild(projectTitle);
    projectDivision.appendChild(projectDescription);
    projectWrapper.appendChild(projectDivision);
    projectDialog.close();
  });

  const closeModalBtn = document.createElement("button");
  closeModalBtn.textContent = "Close";
  projectDialog.appendChild(closeModalBtn);

  closeModalBtn.addEventListener("click", () => {
    projectDialog.close();
  });

  projectDialog.showModal();
});
