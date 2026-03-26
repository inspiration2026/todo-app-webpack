export const projectView = {
    container: null,

    init() {
        this.container = document.getElementById('project-list');
        this.attachListeners();
    },

    render(projects, currentProjectId) {
        if (!this.container) return;

        this.container.innerHTML = '';

        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = `project-item ${project.id === currentProjectId ? 'active' : ''}`;
            projectElement.dataset.id = project.id;
            projectElement.textContent = project.name;

            this.container.appendChild(projectElement);
        });
    },

    attachListeners() {
        this.container.addEventListener('click', (event) => {
            const projectElement = event.target.closest('.project-item');
            if (!projectElement) return;

            const projectId = projectElement.dataset.id;

            if (this.onProjectSelected) {
                this.onProjectSelected(projectId);
            }
        });
    },

    // Callbacks to be set by controller
    onProjectSelected: null
};