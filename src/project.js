class Project {
  constructor(title, description, isDefault = false) {
    this.title = title;
    this.description = description;
    this.tasks = isDefault
      ? [
          {
            id: 1,
            title: "Study",
            description: "Study properly for 1 hour",
            dueDate: "10/25/25",
            priority: 1,
          },
          {
            id: 2,
            title: "Sleep",
            description: "Sleep soundly for 8 hours",
            dueDate: "10/25/25",
            priority: 1,
          },
          {
            id: 3,
            title: "Eat",
            description: "Eat real food 3 times a day",
            dueDate: "10/25/25",
            priority: 2,
          },
          {
            id: 4,
            title: "Exercise",
            description: "Exercise atleast 30 minutes",
            dueDate: "10/25/25",
            priority: 2,
          },
          {
            id: 5,
            title: "Run",
            description: "Run 1 kilometer early in the morning",
            dueDate: "10/25/25",
            priority: 3,
          },
        ]
      : [];
  }
}

const defaultProject = new Project(
  "Project",
  "A description related to the project",
  true
);

export { defaultProject, Project };
