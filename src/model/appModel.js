import { Project } from "./project.js";

export const appModel = {
    projects: [],
    currentProjectId: null,

    addProject(projectName) {
        const newProject = new Project(projectName);
        this.projects.push (newProject);
        this.currentProjectId = newProject.id;
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
        const index = this.projects.findIndex(p => p.id === projectId);
        if (index !== -1) {
            this.projects.splice(index, 1);
            if (this.currentProjectId === projectId) {
                this.currentProjectId = this.projects.length > 0 
                    ? this.projects[0].id 
                    : null;
            }
        }
    }
}