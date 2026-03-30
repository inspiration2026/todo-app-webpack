import { Project } from "./project.js";

export const appModel = {
    projects: [],
    currentProjectId: null,
    doneProject: null,

    init() {
        this.createDoneProject();
    },

    createDoneProject() {
        this.doneProject = new Project("Done");
        this.doneProject.id = "done-project-id";   // fixed ID so we can find it easily
        this.projects.push(this.doneProject);
    },

    addProject(projectName) {
        const newProject = new Project(projectName);
        this.projects.push (newProject);
        // Don't set "Done" as current project
        if (newProject.name !== "Done") {
            this.currentProjectId = newProject.id;
        }
        return newProject;
    },
    getAllProjects() {
        return [...this.projects];      
    },
    setCurrentProject(projectId) {
        const projectExists = this.projects.some(p => p.id === projectId);
        if (projectExists) {
            this.currentProjectId = projectId;
        }
    },
    getCurrentProject() {
        if (!this.currentProjectId) return null;
        return this.projects.find(project => project.id === this.currentProjectId);
    },
    deleteProject(projectId) {
        // Prevent deleting the "Done" project
        if (projectId === "done-project-id") return;

        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            this.projects.splice(index, 1);

            if (this.currentProjectId === projectId) {
                this.currentProjectId = this.projects.length > 0 
                    ? this.projects[0].id 
                    : null;
            }
        }
    },
    moveTodoToDone(todoId) {
        const currentProject = this.getCurrentProject();
        if (!currentProject || currentProject.id === "done-project-id") return;

        const doneProject = this.getDoneProject();
        if (!doneProject) return;

        currentProject.moveTodoTo(todoId, doneProject);
    },

    moveTodoBackFromDone(todoId) {
        const doneProject = this.getDoneProject();
        if (!doneProject) return;

        const todo = doneProject.getTodoById(todoId);
        if (!todo || !todo.originalProjectId) return;

        const originalProject = this.projects.find(p => p.id === todo.originalProjectId);
        if (originalProject) {
            doneProject.moveTodoTo(todoId, originalProject);
        }
    }
}