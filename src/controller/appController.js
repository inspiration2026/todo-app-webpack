// appController.js

import { appModel } from '../model/appModel.js';
import { todoView } from '../view/todoView.js';
import { projectView } from '../view/projectView.js';

export const appController = {

    init() {
        appModel.init();
        todoView.init();
        // projectView.init();

        this.defaultProject();

        this.setupViewCallbacks();

        this.refreshAll();
    },

    setupViewCallbacks() {

        todoView.onAddTodo = (title, dueDate, priority) => {
            const currentProject = appModel.getCurrentProject();
            if (currentProject) {
                currentProject.addTodo(title, "", dueDate, priority);
                todoView.hideForm();           // hide form after adding
                this.refreshTodos();
            }
        };

        todoView.onToggleComplete = (todoId) => {
            const currentProject = appModel.getCurrentProject();
            if (!currentProject) return;

            const todo = currentProject.getTodoById(todoId) || 
                        appModel.getDoneProject().getTodoById(todoId);

            if (!todo) return;

            todo.toggleComplete();

            if (todo.completed) {
                // Move to Done
                appModel.moveTodoToDone(todoId);
            } else {
                // Move back to original project
                appModel.moveTodoBackFromDone(todoId);
            }

            this.refreshAll();
        };

        todoView.onDeleteTodo = (todoId) => {
            const currentProject = appModel.getCurrentProject();
            if (currentProject) {
                currentProject.deleteTodo(todoId);
                this.refreshTodos();
            }
        };

        projectView.onProjectSelected = (projectId) => {
            appModel.setCurrentProject(projectId);
            this.refreshAll();
        };
    },

    refreshTodos() {
    const currentProject = appModel.getCurrentProject();
    const addTodoBtn = document.getElementById('add-todo-btn');

    if (currentProject) {
        const todos = currentProject.getAllTodos();
        todoView.render(todos);

        const isDoneProject = currentProject.id === "done-project-id";
        
        // Update project title
        document.getElementById('current-project-name').textContent = currentProject.name;

        // Hide "New Todo" button when Done is selected
        if (addTodoBtn) {
            addTodoBtn.classList.toggle('hidden', isDoneProject);
        }

    } else {
        todoView.render([]);
        document.getElementById('current-project-name').textContent = 'No Project Selected';
    }
},

    refreshAll() {
        const allProjects = appModel.getAllProjects();
        const currentId = appModel.currentProjectId;

        projectView.render(allProjects, currentId);
        this.refreshTodos();
    },

    showAddTodoForm() {
        todoView.showForm();
    },

    addNewProject() {
        const name = prompt("Enter project name:");
        if (name && name.trim() !== "") {
            appModel.addProject(name.trim());
            this.refreshAll();
        }
    },

    defaultProject() {
        appModel.addProject("Default");
    }
};