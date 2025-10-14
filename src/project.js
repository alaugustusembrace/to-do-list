class Project {
  constructor(title, description, isDefault = false) {
    this.title = title;
    this.description = description;
    this.tasks = isDefault
      ? [
          { id: 1, text: "Study" },
          { id: 2, text: "Sleep" },
          { id: 3, text: "Eat" },
          { id: 4, text: "Exercise" },
          { id: 5, text: "Run" },
        ]
      : [];
    "Study", "Sleep", "Eat", "Exercise", "Run";
  }
}

const defaultProject = new Project(
  "Project",
  "A description related to the project",
  true
);

export { defaultProject, Project };
