var todoList = {
  todos: [],

  addTodos: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },

  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },

  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      }
      else {
        todo.completed = true;
      }
    });
  }
};


var handlers = {
  addTodo: function() {
    var addTodoInput = document.getElementById("addTodoInput");
    todoList.addTodos(addTodoInput.value);
    addTodoInput.value = "";
    view.displayTodos(); 
  },

  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoInput = document.getElementById("changeTodoInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoInput.value);
    changeTodoPositionInput.value = "";
    changeTodoInput.value = "";
    view.displayTodos(); 
  },

  deleteTodo: function(deletePosition) {
    todoList.deleteTodo(deletePosition);
    view.displayTodos(); 
  },

  toggleCompleted: function() {
    var toggleTodoPositionInput = document.getElementById("toggleTodoPositionInput");
    todoList.toggleCompleted(toggleTodoPositionInput.valueAsNumber);
    toggleTodoPositionInput.value = "";
    view.displayTodos(); 
  },

  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos(); 
  },

  deleteButtonTodo: function() {
    var elementClicked = event.target;
    if (elementClicked.className === "deleteButton") {
      this.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
  }
};


var view = {
  displayTodos: function() {
    if (todoList.todos.length === 0) {
      var todoEmpty = document.getElementById("displayTodo")
      todoEmpty.innerHTML = "<br><br>The todo list is empty.";
    }
    else {
      var todoUl = document.querySelector("ul");
      todoUl.innerHTML = "";

      todoList.todos.forEach(function(todo, position) {
        var todoLi = document.createElement("li");

        if (todo.completed === true) {
          var todoTextWithCompletion = "(x) " + todo.todoText;
        }
        else {
          var todoTextWithCompletion = "( ) " + todo.todoText;
        }       

        todoLi.id = position;
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild(this.createDeleteButton());
        todoUl.appendChild(todoLi);
      }, this);
    }         
  },

  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  }

  // setUpEventListeners: function() {
  //   var todosUl = document.querySelector("ul");

  //   todosUl.addEventListener("click", function(event) {
  //     var elementClicked = event.target;
  //     if (elementClicked.className === "deleteButton") {
  //       handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
  //     }
  //   });
  // }
};

//view.setUpEventListeners();


