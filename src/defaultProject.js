import { createDefaultTasks } from "./defaultTasks.js";

const defaultTasks = createDefaultTasks;

const createDefaultProject = (
  title,
  description,
  listArea,
  createDefaultTasks
) => {
  const projectDivision = document.createElement("button");
  projectDivision.classList.add("projectDivision");
  const projectTitle = document.createElement("h2");
  const projectDescription = document.createElement("p");
  projectTitle.textContent = title;
  projectDescription.textContent = description;
  projectDivision.appendChild(projectTitle);
  projectDivision.appendChild(projectDescription);

  // Clearing the listArea then Assigning its respective lists
  projectDivision.addEventListener("click", () => {
    listArea.innerHTML = "";
    defaultTasks(listArea);
  });

  return { projectDivision };
};

export { createDefaultProject };
