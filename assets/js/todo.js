// BUTUN LAZIM OLAN ELEMENTLERI ONCEDEN SECME
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() { // Butun event listenerler
  form.addEventListener("submit", addTodo);
  document.addEventListener('DOMContentLoaded', loadAllTodosToUI);
  secondCardBody.addEventListener('click', deleteTodo);
  filter.addEventListener("keyup", filterTodos);
  clearButton.addEventListener('click', clearAllTodos)
}
function clearAllTodos(e){ //Todolar hamisini silmek 
    if(confirm("Hamısını silmək istədirinizdən əminisiniz?")){
        while(todoList.firstElementChild !== null){
            todoList.removeChild(todoList.firstElementChild)
        }
        localStorage.removeItem("todos") //local stroge temizlemek
    }
}


function filterTodos(e){ // Tekrar todo daxil edilmemeyi ucun
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item")

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
        if(text.indexOf(filterValue) === -1){
            listItem.setAttribute("style", "display : none !important")
        } 
        else {
            listItem.setAttribute("style", "display : block" )
        }


    })
}

function deleteTodo(e){ //Ekrandan todolari silmek
    
    if(e.target.className === "fa fa-remove"){
        if(confirm('Silmək istədiyinizdən əminsiniz?')){    

            console.log(e.target);
            
            e.target.parentElement.parentElement.remove()
            deleteTodoFromStorage(e.target.parentElement.parentElement.textContent)
            showAlert('success', 'Todo uğurla silindi...')

        }
    }
}


function deleteTodoFromStorage(deletetodo){ //LOCAL STORAGEDEN SILMEK
    let todos = getTodosFromStorage()
        todos.forEach(function(todo, index){
            if(todo === deletetodo){
                todos.splice(index, 1); //Arraydan deyeri silmek
            }
        })
        localStorage.setItem("todos", JSON.stringify(todos))
}


function loadAllTodosToUI(){ // local storage elave elemek 
    let todos = getTodosFromStorage();

    todos.forEach(function(todo){
        addTodoUI(todo)
    })
}

function addTodo(e) {
    
  const newTodo = todoInput.value.trim();
  console.log(filterAddTodo(newTodo))

  if (newTodo === "")  {
    showAlert("danger", "Xahiş olunur todo xanasını boş buraxmayasınız...");
  }else if(filterAddTodo(newTodo)){
    showAlert("danger", "Bu todo daxil olunub...")
  } else {

    showAlert("success", "Sizin todonuz uğurla əlavə olundu...");
    addTodoStorge(newTodo)
    addTodoUI(newTodo);
  }

  e.preventDefault();
}
function filterAddTodo(newTodo){
    let todos  = getTodosFromStorage();
    let status = false;
    todos.forEach(function(todo){
        if(todo == newTodo){
            status = true;
        }
    })
    return status;
}

function showAlert(type, message) {  //Todoya elave olunub olunmadigi zaman cixan xeberdarliq
    let alert = document.createElement("div");
    alert.setAttribute("role", "alert");
    alert.className = `alert alert-${type}`;
  
    alert.textContent = message;
  
    firstCardBody.appendChild(alert);
  
    setTimeout(() => {
      alert.remove();
    }, 1000);
}

function addTodoUI(newTodo) { // Aldigimiz string deyerini UI-e elave eedirik
  //List Item yaratmaq
  const listItem = document.createElement("li");
  listItem.className = "list-group-item d-flex justify-content-between";

  //  link yaratmaq
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";

  //Text Node elave elemek
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  //Todo liste list item elave elemek
  todoList.appendChild(listItem);
  todoInput.value = "";
}

function getTodosFromStorage(){ //Storage den todolari almaq
    let todos;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}

function addTodoStorge(newTodo){
    let todos = getTodosFromStorage()

    todos.push(newTodo)

    localStorage.setItem("todos", JSON.stringify(todos))
}


