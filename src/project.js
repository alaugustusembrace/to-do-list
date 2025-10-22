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
            title: "Study",
            description: "Study straight for 1 hour",
            dueDate: format(studyDueDate, "MMMM dd, yyyy"),
            priority: "high",
          },
          {
            id: 2,
            title: "Sleep",
            description: "Sleep soundly for 8 hours",
            dueDate: format(today, "MMMM dd, yyyy"),
            priority: "high",
          },
          {
            id: 3,
            title: "Eat",
            description: "Eat food 3 times a day",
            dueDate: format(today, "MMMM dd, yyyy"),
            priority: "medium",
          },
          {
            id: 4,
            title: "Exercise",
            description: "Exercise atleast 30 minutes",
            dueDate: format(exerciseDueDate, "MMMM dd, yyyy"),
            priority: "medium",
          },
          {
            id: 5,
            title: "Run",
            description: "Run 1 kilometer early in the morning",
            dueDate: format(runDueDate, "MMMM dd, yyyy"),
            priority: "low",
          },
        ]
      : [];
  }
}

const defaultProject = new Project("Routine", true);

export { defaultProject, Project };
