import "./styles.css";
import { defaultProject } from "./project.js";

const content = document.getElementById("content");
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

// Creating task
const listArea = document.createElement("ul");
for (const task of defaultProject.tasks) {
  const li = document.createElement("li");
  li.textContent = task;
  listArea.appendChild(li);
}

content.appendChild(title);
content.appendChild(projectDivision);
content.appendChild(listArea);
