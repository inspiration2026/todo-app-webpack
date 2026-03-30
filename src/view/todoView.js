export const todoView = {
    container: null,
    form: null,
    titleInput: null,
    dueInput: null,
    prioritySelect: null,

    init() {
        this.container = document.getElementById('todo-list');
        this.form = document.getElementById('add-todo-form');
        this.titleInput = document.getElementById('todo-title-input');
        this.dueInput = document.getElementById('todo-due-input');
        this.prioritySelect = document.getElementById('todo-priority-input');
        this.attachListeners();
    },

    // Show the form
    showForm() {
        if (this.form) {
            this.form.classList.add('show');
            this.titleInput.focus();
        }
    },

    // Hide the form and clear inputs
    hideForm() {
        if (this.form) {
            this.form.classList.remove('show');
            this.titleInput.value = '';
            this.dueInput.value = '';
            this.prioritySelect.value = 'medium';
        }
    },


    render(todos) {
        if (!this.container) return;
        this.container.innerHTML = '';  

        if (todos.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'empty-message';
            emptyMsg.textContent = 'No todos yet. Add one!';
            this.container.appendChild(emptyMsg);
            return;
        }

        todos.forEach(todo => {
            const todoElement = this.createTodoElement(todo);
            this.container.appendChild(todoElement);
        });
    },
    createTodoElement(todo) {
        const todoElement = document.createElement('div');
        todoElement.className = 'todo-item';
        todoElement.dataset.id = todo.id;

        // Checkbox
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;

        // Title
        const titleSpan = document.createElement('span');
        titleSpan.className = `todo-title ${todo.completed ? 'completed' : ''}`;
        titleSpan.textContent = todo.title;

        // Due date
        const dueDateSpan = document.createElement('span');
        dueDateSpan.className = 'todo-due-date';
        dueDateSpan.textContent = todo.dueDate || '';

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';

        // Append everything to the todo item
        todoElement.appendChild(checkbox);
        todoElement.appendChild(titleSpan);
        todoElement.appendChild(dueDateSpan);
        todoElement.appendChild(deleteBtn);

        return todoElement;
    },
    attachListeners() {
        // Form submission
        const saveBtn = document.getElementById('save-todo-btn');
        const cancelBtn = document.getElementById('cancel-todo-btn');

        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                if (this.onAddTodo) {
                    const title = this.titleInput.value.trim();
                    if (title) {
                        this.onAddTodo(title, this.dueInput.value, this.prioritySelect.value);
                    }
                }
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                this.hideForm();
            });
        }

        this.container.addEventListener('click', (event) => {
            const todoElement = event.target.closest('.todo-item');
            if (!todoElement) return;

            const todoId = todoElement.dataset.id;

            // Handle checkbox click
            if (event.target.classList.contains('todo-checkbox')) {
                if (this.onToggleComplete) {
                    this.onToggleComplete(todoId);
                }
            }

            // Handle delete button click
            if (event.target.classList.contains('delete-btn')) {
                if (this.onDeleteTodo) {
                    this.onDeleteTodo(todoId);
                }
            }
        });
    },
    onAddTodo: null,
    onToggleComplete: null,
    onDeleteTodo: null
}
