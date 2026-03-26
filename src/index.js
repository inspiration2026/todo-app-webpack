// index.js

import "./styles.css";
import { appController } from "./controller/appController.js";

// Also connect the two main buttons from HTML
document.addEventListener("DOMContentLoaded", () => {

    // Initialize the whole app
    appController.init();

    // Connect "+ New Project" button
    const addProjectBtn = document.getElementById("add-project-btn");
    if (addProjectBtn) {
        addProjectBtn.addEventListener("click", () => {
            appController.addNewProject();
        });
    }

    // Connect "+ New Todo" button
    const addTodoBtn = document.getElementById("add-todo-btn");
    if (addTodoBtn) {
        addTodoBtn.addEventListener("click", () => {
            appController.addNewTodo();
        });
    }
});

