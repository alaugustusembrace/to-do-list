import { format, addDays } from "date-fns";

const today = new Date();
const studyDueDate = addDays(today, 5);
const exerciseDueDate = addDays(today, 4);
const runDueDate = addDays(today, 3);

class Project {
  constructor(title, isDefault = false) {
    this.title = title;
    this.tasks = isDefault
      ? [
          {
            id: 1,
            title: "Capture Saddam Hussein",
            description: "Saddam Hussein's playing hide and seek, find him",
            dueDate: format(studyDueDate, "MMMM dd, yyyy"),
            priority: "high",
          },
          {
            id: 2,
            title: "Fix the bug",
            description: "Fix the butterfly's wings",
            dueDate: format(today, "MMMM dd, yyyy"),
            priority: "high",
          },
          {
            id: 3,
            title: "Hiking",
            description: "Hike mount apo with the spartans",
            dueDate: format(today, "MMMM dd, yyyy"),
            priority: "medium",
          },
          {
            id: 4,
            title: "Attend the meeting",
            description: "Attend the google meet for the thesis consultation",
            dueDate: format(exerciseDueDate, "MMMM dd, yyyy"),
            priority: "medium",
          },
          {
            id: 5,
            title: "Join the seminar",
            description: "Join the seminar about financial management",
            dueDate: format(runDueDate, "MMMM dd, yyyy"),
            priority: "low",
          },
        ]
      : [];
  }
}

const defaultProject = new Project("Routine", true);

export { defaultProject, Project };
