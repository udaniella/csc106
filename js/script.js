document.addEventListener('DOMContentLoaded', () => {
  const headerContainer = document.getElementById('site-header');

  if (headerContainer) {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const activePage = currentPage.split('?')[0].split('#')[0] || 'index.html';

    headerContainer.innerHTML = `
      <header class="site-header">
        <a href="index.html" class="brand">Daniella Uzozie</a>
        <nav class="main-nav">
          <a href="index.html" class="${activePage === 'index.html' ? 'active' : ''}">Home</a>
          <a href="about.html" class="${activePage === 'about.html' ? 'active' : ''}">About</a>
          <a href="projects.html" class="${activePage === 'projects.html' ? 'active' : ''}">Projects</a>
          <a href="planner.html" class="${activePage === 'planner.html' ? 'active' : ''}">Planner</a>
          <a href="contact.html" class="${activePage === 'contact.html' ? 'active' : ''}">Contact</a>
        </nav>
      </header>
    `;
  }

  const taskForm = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const form = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  const tasks = [
    { id: 1, text: 'Complete web development assignment', completed: false },
    { id: 2, text: 'Review lecture notes', completed: true },
  ];

  function renderTasks() {
    if (!taskList) return;

    taskList.innerHTML = '';

    tasks.forEach((task) => {
      const item = document.createElement('li');
      item.className = `task-item ${task.completed ? 'completed' : ''}`;
      item.innerHTML = `
        <span>${task.text}</span>
        <div class="task-actions">
          <button type="button" data-action="toggle">${task.completed ? 'Undo' : 'Done'}</button>
          <button type="button" data-action="delete">Delete</button>
        </div>
      `;
      item.dataset.id = task.id;
      taskList.appendChild(item);
    });
  }

  if (taskForm && taskInput && taskList) {
    taskForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const text = taskInput.value.trim();

      if (!text) return;

      tasks.push({ id: Date.now(), text, completed: false });
      taskInput.value = '';
      renderTasks();
    });

    taskList.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button) return;

      const item = button.closest('.task-item');
      const taskId = Number(item?.dataset.id);
      const action = button.dataset.action;

      if (action === 'toggle') {
        const task = tasks.find((entry) => entry.id === taskId);
        if (task) {
          task.completed = !task.completed;
        }
      }

      if (action === 'delete') {
        const index = tasks.findIndex((entry) => entry.id === taskId);
        if (index >= 0) {
          tasks.splice(index, 1);
        }
      }

      renderTasks();
    });

    renderTasks();
  }

  if (form && formMessage) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^\d+$/;

      if (!name || !email || !phone || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        return;
      }

      if (!emailPattern.test(email)) {
        formMessage.textContent = 'Please enter a valid email address.';
        return;
      }

      if (!phonePattern.test(phone)) {
        formMessage.textContent = 'Phone number must contain only digits.';
        return;
      }

      formMessage.textContent = 'Thank you! Your message has been sent.';
      form.reset();
    });
  }
});
