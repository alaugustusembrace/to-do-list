import "./styles.css";
import { defaultProject } from "./project.js";

const content = document.getElementById("content");
// const testing = document.getElementById("testing");
const title = document.createElement("h1");
title.textContent = "TO DO LIST";

// Creating Project
const projectDivision = document.createElement("button");
const projectTitle = document.createElement("h2");
const projectDescription = document.createElement("p");
projectTitle.textContent = defaultProject.title;
projectDescription.textContent = defaultProject.description;
projectDivision.appendChild(projectTitle);
projectDivision.appendChild(projectDescription);

// Creating default task
let taskItemIndex = 0;
const listArea = document.createElement("ul");
for (const task of defaultProject.tasks) {
  const taskItem = document.createElement("li");
  taskItem.dataset.id = taskItemIndex++;
  const taskContainer = document.createElement("div");
  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.classList.add("remove-btn");
  removeTaskBtn.textContent = "X";
  taskContainer.classList.add("taskContainer");

  taskContainer.textContent = task;
  taskContainer.appendChild(removeTaskBtn);
  taskItem.appendChild(taskContainer);
  listArea.appendChild(taskItem);

  // Remove task
  removeTaskBtn.addEventListener("click", (e) => {
    const listItem = e.target.closest("li");
    console.log("arow");

    // const unfinishedTasks = defaultProject.tasks.filter(
    //   (item) => item.length >= 5
    // );
    // const testingList = document.createElement("ul");
    // for (const testItem of unfinishedTasks) {
    //   const listItem = document.createElement("li");
    //   listItem.textContent = testItem;
    //   testingList.appendChild(listItem);
    // }
    // testing.appendChild(testingList);
  });
}

const addTaskInput = document.createElement("input");
addTaskInput.placeholder = "Buy a new tank";
const addTaskBtn = document.createElement("button");
addTaskBtn.textContent = "Add Task";

content.appendChild(title);
content.appendChild(projectDivision);
content.appendChild(listArea);
content.appendChild(addTaskInput);
content.appendChild(addTaskBtn);

// Add task
addTaskBtn.addEventListener("click", () => {
  defaultProject.tasks.push(addTaskInput.value);
  const taskItem = document.createElement("li");
  const taskContainer = document.createElement("div");
  const removeTaskBtn = document.createElement("button");
  removeTaskBtn.textContent = "X";
  taskContainer.classList.add("taskContainer");
  taskContainer.textContent = addTaskInput.value;
  taskContainer.appendChild(removeTaskBtn);
  taskItem.appendChild(taskContainer);
  listArea.appendChild(taskItem);

  // Remove task
  removeTaskBtn.addEventListener("click", () => {
    console.log("clicked");
  });
});
