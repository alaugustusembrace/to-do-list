import "./styles.css";
import { createBaseContent } from "./baseContent.js";
import { createDefaultProject } from "./defaultProject.js";
import { defaultProject } from "./project.js";
import { createDefaultTasks } from "./defaultTasks.js";

const { content, projectWrapper, listAreaWrapper, listArea } =
  createBaseContent();

// Creating Default Tasks
createDefaultTasks(listArea, content);

// Creating Default Project
const { projectDivision } = await createDefaultProject(
  defaultProject.title,
  listArea,
  content,
  defaultProject,
  listAreaWrapper,
);

// fetch projects
async function getProjects() {
  const response = await fetch("http://localhost:5000/api/projects");
  const projects = await response.json();

  for (let i = 1; i < projects.length; i++) {
    const newProjectDivision = document.createElement("button");
    newProjectDivision.classList.add("newProjectDivision");
    const projectTitle = document.createElement("h2");
    projectTitle.textContent = projects[i].title;

    newProjectDivision.appendChild(projectTitle);
    projectWrapper.appendChild(newProjectDivision);
  }
}

projectWrapper.appendChild(projectDivision);
getProjects();
