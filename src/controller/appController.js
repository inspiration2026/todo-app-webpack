// appController.js

import { appModel } from '../model/appModel.js';
import { todoView } from '../view/todoView.js';
import { projectView } from '../view/projectView.js';

export const appController = {

    init() {
        // Initialize views
        todoView.init();
        projectView.init();

        // Set up callbacks (connect views to controller)
        this.setupViewCallbacks();

        // Load initial data and render
        this.refreshAll();
    },

    setupViewCallbacks() {
        // Todo View callbacks
        todoView.onToggleComplete = (todoId) => {
            const currentProject = appModel.getCurrentProject();
            if (currentProject) {
                currentProject.toggleComplete(todoId);   // we'll add this method later
                this.refreshTodos();
            }
        };

        todoView.onDeleteTodo = (todoId) => {
            const currentProject = appModel.getCurrentProject();
            if (currentProject) {
                currentProject.deleteTodo(todoId);
                this.refreshTodos();
            }
        };

        // Project View callback
        projectView.onProjectSelected = (projectId) => {
            appModel.setCurrentProject(projectId);
            this.refreshAll();
        };
    },

    // Refresh only the todo list
    refreshTodos() {
        const currentProject = appModel.getCurrentProject();
        if (currentProject) {
            const todos = currentProject.getAllTodos();
            todoView.render(todos);
            document.getElementById('current-project-name').textContent = currentProject.name;
        } else {
            todoView.render([]);
            document.getElementById('current-project-name').textContent = 'No Project Selected';
        }
    },

    // Refresh everything (projects + todos)
    refreshAll() {
        const allProjects = appModel.getAllProjects();
        const currentId = appModel.currentProjectId;

        projectView.render(allProjects, currentId);
        this.refreshTodos();
    },

    // Add new project
    addNewProject() {
        const name = prompt("Enter project name:");
        if (name && name.trim() !== "") {
            appModel.addProject(name.trim());
            this.refreshAll();
        }
    },

    // Add new todo
    addNewTodo() {
        const currentProject = appModel.getCurrentProject();
        if (!currentProject) {
            alert("Please select or create a project first!");
            return;
        }

        const title = prompt("Enter todo title:");
        if (title && title.trim() !== "") {
            currentProject.addTodo(title.trim());
            this.refreshTodos();
        }
    }
};