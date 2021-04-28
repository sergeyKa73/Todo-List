const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Добавить функцию удаления. Реализовать смену темы оформления',
    title: 'ToDo-List',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Закончить изучение документации и выполнить практическое задание',
    title:
      'Bootstrap 4',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Завершить блок DOM и пройти Тест 3: "Тест на знание DOM"',
    title: 'Udemy Современный JavaScript',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Завершить курс "Основы верстки сайта" и получить сертификат',
    title:
      'НЕТОЛОГИЯ',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acum, task) => {
    acum[task._id] = task;
    return acum;
  },{});

  // Elemets UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group'    
  );

  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];

//Events
  renderAllTasks(objOfTasks);  
  form.addEventListener('submit',onFormSubmitHandler);
  listContainer.addEventListener('click', onDeleteHandler);

  function renderAllTasks(tasksList) {
      if(!tasksList) {
        console.error("Передайте список задач");
        return;
      }

      const fragment = document.createDocumentFragment();
      Object.values(tasksList).forEach(task => {
        const li = listItemTemplate(task);
        fragment.appendChild(li);
      });
      listContainer.appendChild(fragment);
  }

  function listItemTemplate({_id, title, body } = {}) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex", 
      "align-items-center",
      "flex-wrap",
      "mt-2"
    );
     li.setAttribute('data-task-id', _id);
      
      const span = document.createElement('span');
      span.textContent = title;
      span.style.fontWeight = "bold";

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = "Delete task";
      deleteBtn.classList.add(
        "btn", "btn-danger", "ml-auto", "delete-btn"
      );

      const article = document.createElement('p');
      article.textContent = body;
      article.classList.add(
        "mt-2", "w-100"
      );

      li.appendChild(span);
      li.appendChild(deleteBtn);
      li.appendChild(article);

      return li;

  }

  function onFormSubmitHandler (e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    console.log(titleValue, bodyValue);

    if(!titleValue || !bodyValue) {
      alert("Пожалуйста введите title и body");
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem); // добавляет переданный элемент в DOM-дерево относительно элемента, вызвавшего метод.
    form.reset();
  } 

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };

    objOfTasks[newTask._id] = newTask;

    return{...newTask};
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Вы уверены что ходите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml (confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }
  
  function onDeleteHandler({target}) {
      if (target.classList.contains('delete-btn')) {
      const parent = target.closest('[data-task-id]');
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);   
      deleteTaskFromHtml(confirmed, parent);
     }
  }


})(tasks);
