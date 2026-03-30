import {Todo} from "./todo.js";

export class Project {
    constructor(projectName) {
        this.name = projectName;
        this.todos = [];
        this.id = crypto.randomUUID();
    }
    addTodo(title, description, dueDate, priority) {
        const newTodo = new Todo(title, description, dueDate, priority);
        this.todos.push (newTodo);
        return newTodo;
    }
    deleteTodo (todoId) {
        const index = this.todos.findIndex (todo => (todo.id === todoId));
        if (index !== -1) {
        this.todos.splice (index,1);
        }
    }
    getAllTodos() {
        return [...this.todos];
    }
    getTodoById(todoId) {
        return this.todos.find(todo => (todo.id === todoId));
    }
    updateTodo(todoId, updateData) {
        const todo = this.todos.find(todo => (todo.id === todoId));
        if (todo) {
            todo.update(updateData);
        };
    }
    // NEW: Move a todo to another project
    moveTodoTo(todoId, targetProject) {
        const index = this.todos.findIndex(todo => todo.id === todoId);
        if (index === -1) return null;

        const todo = this.todos[index];
        this.todos.splice(index, 1);           // remove from current project

        // Add to target project, preserving originalProjectId
        targetProject.addTodo(
            todo.title,
            todo.description,
            todo.dueDate,
            todo.priority,
            todo.originalProjectId || this.id   // save original if not already set
        );

        return todo;
    }
}