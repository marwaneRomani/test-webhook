class TodoApp {
    constructor() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.healthStatus = document.getElementById('healthStatus');
        
        this.init();
    }

    init() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });

        this.loadTodos();
        this.checkHealth();
        
        // Check health every 30 seconds
        setInterval(() => this.checkHealth(), 30000);
    }

    async loadTodos() {
        try {
            const response = await fetch('/api/todos');
            const todos = await response.json();
            this.renderTodos(todos);
        } catch (error) {
            console.error('Error loading todos:', error);
            this.showError('Failed to load todos');
        }
    }

    async addTodo() {
        const text = this.todoInput.value.trim();
        if (!text) return;

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });

            if (response.ok) {
                this.todoInput.value = '';
                this.loadTodos();
            } else {
                throw new Error('Failed to add todo');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            this.showError('Failed to add todo');
        }
    }

    async deleteTodo(id) {
        try {
            const response = await fetch(`/api/todos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                this.loadTodos();
            } else {
                throw new Error('Failed to delete todo');
            }
        } catch (error) {
            console.error('Error deleting todo:', error);
            this.showError('Failed to delete todo');
        }
    }

    renderTodos(todos) {
        this.todoList.innerHTML = '';
        
        if (todos.length === 0) {
            this.todoList.innerHTML = '<li class="empty-state">No todos yet. Add one above!</li>';
        } else {
            todos.forEach((todo) => {
                const li = document.createElement('li');
                li.className = 'todo-item';
                li.innerHTML = `
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn" onclick="app.deleteTodo(${todo.id})">Delete</button>
                `;
                this.todoList.appendChild(li);
            });
        }

        this.updateCount(todos.length);
    }

    updateCount(count) {
        this.todoCount.textContent = `${count} todo${count !== 1 ? 's' : ''}`;
    }

    async checkHealth() {
        try {
            const response = await fetch('/health');
            const health = await response.json();
            
            if (health.status === 'healthy') {
                this.healthStatus.textContent = '🟢 Connected to Redis';
                this.healthStatus.className = 'health-connected';
            } else {
                this.healthStatus.textContent = '🔴 Redis disconnected';
                this.healthStatus.className = 'health-disconnected';
            }
        } catch (error) {
            this.healthStatus.textContent = '🔴 Server disconnected';
            this.healthStatus.className = 'health-disconnected';
        }
    }

    showError(message) {
        // Simple error display - in a real app you'd want a proper notification system
        alert(message);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when the page loads
const app = new TodoApp();
