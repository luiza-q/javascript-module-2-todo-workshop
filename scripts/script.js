const el = document.querySelector('#new-todo');

el.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = e.target.elements.text.value.trim();

    if (text.length > 0) {
        createTodo(text);
        e.target.elements.text.value  = '';
    }
   renderTodos(todos);
});

const todos =  [];

const createTodo = (text) => {
    todos.push(text);
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const todoText = document.createElement('span');

    // Setup the todo text
    todoText.textContent = todo;
    containerEl.appendChild(todoText);

    // Setup container
    todoEl.classList.add('list-item');
    containerEl.classList.add('list-item__container');
    todoEl.appendChild(containerEl);

    // Setup the remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'remove';
    removeButton.classList.add('button', 'button--text');
    todoEl.appendChild(removeButton);
    removeButton.addEventListener('click', () => {
        removeTodo(todoText)
        renderTodos(todos)
    })

    return todoEl;
}

const renderTodos = (todos) => {
    const todoList = document.querySelector('#todos');
    todoList.innerHTML = '';

    if (todos.length > 0) {
        todos.forEach((todo) => {
            todoList.appendChild(generateTodoDOM(todo));
        })
    } else {
        const messageEl = document.createElement('p');
        messageEl.classList.add('empty-message');
        messageEl.textContent = 'There are no todos to show';
        todoList.appendChild(messageEl);
    }
}

const removeTodo = (todoEl) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo === todoEl.textContent;
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}


renderTodos(todos);

