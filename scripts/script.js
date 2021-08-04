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

const filters = {
    searchTitle: '',
    showFinished: false,
    showUnfinished: false
}

const setFilters = (updates) => {
    if (typeof updates.searchTitle === 'string') {
       filters.searchTitle = updates.searchTitle;
    }

    if (typeof updates.showFinished === 'boolean') {
        filters.showFinished = updates.showFinished;
    }

    if (typeof updates.showUnfinished === 'boolean') {
        filters.showUnfinished = updates.showUnfinished;
    }
}









const createTodo = (text) => {
    todos.push({
        title: text,
        completed: false
    })
}

const generateTodoDOM = (todoObj) => {
    const todoEl = document.createElement('label');
    const containerEl = document.createElement('div');
    const todoText = document.createElement('span');
    const checkbox = document.createElement('input');

    // Setup checkbox
    checkbox.setAttribute('type', 'checkbox');
    checkbox.checked = todoObj.completed;
    checkbox.addEventListener('change', () => {
        toggleToDo(todoObj.title);
        renderTodos(todos);
        }
    );


    // Setup the todo text
    todoText.textContent = todoObj.title;
    containerEl.appendChild(checkbox);
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
        removeTodo(todoObj.title)
        renderTodos(todos)
    })

    return todoEl;
}

const toggleToDo = (title) => {
    const todo = todos.find(todo => todo.title === title);

    if (todo) {
        todo.completed = !todo.completed
    }

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

const removeTodo = (title) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.title === title;
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1);
    }
}


renderTodos(todos);

