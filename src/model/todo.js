export class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
        this.completed = false;
        this.originalProjectId = null;
    }

    update (data) {
        this.title = data.title;
        this.description = data.description;
        this.dueDate = data.dueDate;
        this.priority = data.priority;
        this.completed = data.completed;
    }
    toggleComplete () {
        this.completed = !this.completed;
    }


}

