const createNewProject = (title, description, projectWrapper) => {
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
    projectTitle.textContent = title;
    projectDescription.textContent = description;
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
};

export { createNewProject };
