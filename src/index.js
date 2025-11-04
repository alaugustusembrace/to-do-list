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

projectWrapper.appendChild(projectDivision);
