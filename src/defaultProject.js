const createDefaultProject = (title, description) => {
  const projectDivision = document.createElement("button");
  projectDivision.classList.add("projectDivision");
  const projectTitle = document.createElement("h2");
  const projectDescription = document.createElement("p");
  projectTitle.textContent = title;
  projectDescription.textContent = description;
  projectDivision.appendChild(projectTitle);
  projectDivision.appendChild(projectDescription);

  return { projectDivision };
};

export { createDefaultProject };
