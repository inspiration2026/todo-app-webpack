import "./styles.css";
import { appController } from "./controller/appController.js";


document.addEventListener("DOMContentLoaded", () => {

   
    appController.init();

    const addProjectBtn = document.getElementById("add-project-btn");
    if (addProjectBtn) {
        addProjectBtn.addEventListener("click", () => {
            appController.addNewProject();
        });
    }

    const addTodoBtn = document.getElementById("add-todo-btn");
    if (addTodoBtn) {
        addTodoBtn.addEventListener("click", () => {
            appController.showAddTodoForm();
        });
    }
});

