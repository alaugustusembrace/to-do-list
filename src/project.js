class Project {
  constructor(title, description, isDefault = false) {
    this.title = title;
    this.description = description;
    this.tasks = isDefault
      ? [
          { id: 1, title: "Study", description: "Study properly for 1 hour" },
          { id: 2, title: "Sleep", description: "Sleep soundly for 8 hours" },
          { id: 3, title: "Eat", description: "Eat real food 3 times a day" },
          {
            id: 4,
            title: "Exercise",
            description: "Exercise atleast 30 minutes",
          },
          {
            id: 5,
            title: "Run",
            description: "Run 1 kilometer early in the morning",
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
