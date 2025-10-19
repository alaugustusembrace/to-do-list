import { createNewProject } from "./newProject.js";

const createBaseContent = () => {
  const content = document.getElementById("content");

  const projectContainer = document.createElement("div");
  projectContainer.classList.add("projectContainer");

  const project = document.createElement("div");
  project.classList.add("project");

  const projectWrapper = document.createElement("div");
  projectWrapper.classList.add("projectWrapper");

  const projectHeading = document.createElement("h1");
  projectHeading.classList.add("projectHeading");
  projectHeading.textContent = "Projects";

  const listAreaWrapper = document.createElement("div");
  listAreaWrapper.classList.add("listAreaWrapper");

  const listArea = document.createElement("ul");
  listArea.classList.add("listArea");

  // Create New Project Button
  const newProjectDivisionBtn = document.createElement("button");
  newProjectDivisionBtn.classList.add("new-project-btn");
  newProjectDivisionBtn.textContent = "+ New Project";
  projectWrapper.appendChild(newProjectDivisionBtn);

  const projectHeadingAndNewProjectBtnWrapper = document.createElement("div");
  projectHeadingAndNewProjectBtnWrapper.classList.add(
    "projectHeadingAndNewProjectBtnWrapper"
  );
  projectHeadingAndNewProjectBtnWrapper.append(
    projectHeading,
    newProjectDivisionBtn
  );

  projectWrapper.appendChild(projectHeadingAndNewProjectBtnWrapper);
  listAreaWrapper.appendChild(listArea);
  project.append(projectWrapper, listAreaWrapper);

  // Create New Project
  newProjectDivisionBtn.addEventListener("click", () => {
    createNewProject(projectWrapper, listArea, listAreaWrapper);
  });

  content.appendChild(project);

  return {
    content,
    project,
    projectWrapper,
    listAreaWrapper,
    listArea,
  };
};

export { createBaseContent };
