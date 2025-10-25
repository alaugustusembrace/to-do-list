import "./styles.css";
import { createBaseContent } from "./baseContent.js";
import { createDefaultProject } from "./defaultProject.js";
import { defaultProject, Project } from "./project.js";
import { createDefaultTasks } from "./defaultTasks.js";

const { content, project, projectWrapper, listAreaWrapper, listArea } =
  createBaseContent();

// Creating Default Tasks
createDefaultTasks(listArea);

// Creating Default Project
const { projectDivision } = createDefaultProject(
  defaultProject.title,
  listArea,
  content,
  defaultProject,
  listAreaWrapper
);
projectWrapper.appendChild(projectDivision);
