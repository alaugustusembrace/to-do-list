import { format, addDays } from "date-fns";

const today = new Date();
const studyDueDate = addDays(today, 5);
const exerciseDueDate = addDays(today, 4);
const runDueDate = addDays(today, 3);

class Project {
  constructor(title, description, isDefault = false) {
    this.title = title;
    this.description = description;
    this.tasks = isDefault
      ? [
          {
            id: 1,
            title: "Study",
            description: "Study straight for 1 hour",
            dueDate: format(studyDueDate, "MMMM dd, yyyy"),
            priority: 1,
          },
          {
            id: 2,
            title: "Sleep",
            description: "Sleep soundly for 8 hours",
            dueDate: format(today, "MMMM dd, yyyy"),
            priority: 1,
          },
          {
            id: 3,
            title: "Eat",
            description: "Eat real food 3 times a day",
            dueDate: format(today, "MMMM dd, yyyy"),
            priority: 2,
          },
          {
            id: 4,
            title: "Exercise",
            description: "Exercise atleast 30 minutes",
            dueDate: format(exerciseDueDate, "MMMM dd, yyyy"),
            priority: 2,
          },
          {
            id: 5,
            title: "Run",
            description: "Run 1 kilometer early in the morning",
            dueDate: format(runDueDate, "MMMM dd, yyyy"),
            priority: 3,
          },
        ]
      : [];
  }
}

const defaultProject = new Project(
  "Routine",
  "A description related to the project",
  true
);

export { defaultProject, Project };
