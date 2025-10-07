class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = [
      { id: 1, text: "Study" },
      { id: 2, text: "Sleep" },
      { id: 3, text: "Eat" },
      { id: 4, text: "Exercise" },
      { id: 5, text: "Run" },
    ];
    "Study", "Sleep", "Eat", "Exercise", "Run";
  }
}

const defaultProject = new Project(
  "Project",
  "A description related to the project"
);

export { defaultProject };
