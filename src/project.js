class Project {
  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.tasks = ["Study", "Sleep", "Eat", "Exercise", "Run"];
  }
}

const defaultProject = new Project(
  "Project",
  "A description related to the project"
);

export { defaultProject };
