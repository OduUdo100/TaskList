//Code Project was from a JS class.//


//Define UI Vars 
const form = document.querySelector('#task-from');
const taskList = document.querySelector('.collection'); 
const clearBtn = document.querySelector('.clear-tasks'); 
const filter = document.querySelector('#filter'); 
const taskInput = document.querySelector('#task'); 


//Load all event listeners
loadEventListeners(); 

//Load all event listeners
function loadEventListeners(){
    //DOM LoadEvents
    document.addEventListener('DOMContentLoader', getTasks);
    // Add Task From
    form.addEventListener('submit',  addTask);
    //Remove task events
    taskList.addEventListener('click', removeTask); 
    //Clear task
    clearBtn.addEventListener('click', clearTasks); 
    //Filter tasks
    filter.addEventListener('keyup', filterTasks); 
}

//Get Tasks from LS
function getTasks(){
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        task = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //Create li element
        const li = document.createElement('li'); 
        //Add class
        li.className ='collection-item';
        //Create text node and appent to the li
        li.appendChild(document.createTextNode(task)); 
        //Create new link element
        const link = document.createElement('a'); 
        //Add class
        link.className = 'delete-item secondary-content'; 
        //Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></li>';
        //Appened the link to li
        li.appendChild(link); 
        //Apend li to ul
        taskList.appendChild(li);
    });
}

//Add Task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task'); 
    } else 
    {
        //Create li element
        const li = document.createElement('li'); 
        //Add class
        li.className ='collection-item';
        //Create text node and appent to the li
        li.appendChild(document.createTextNode(taskInput.value)); 
        //Create new link element
        const link = document.createElement('a'); 
        //Add class
        link.className = 'delete-item secondary-content'; 
        //Add icon HTML
        link.innerHTML = '<i class="fa fa-remove"></li>';
        //Appened the link to li
        li.appendChild(link); 
        //Apend li to ul
        taskList.appendChild(li);

        //Store in LS
        storeTaskInLocalStorage(taskInput.value);


        //Clear Input
        taskInput.value = ''; 

        e.preventDefault(); 
    }
}


//Store Task
function storeTaskInLocalStorage(task){
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        task = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks)); 
}

//Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if(confirm('Are You Sure?')){
            e.target.parentElement.parentElement.remove();

            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Function to remove from storage
function removeTaskFromLocalStorage(taskItem){
    let tasks; 
    if(localStorage.getItem('tasks') === null){
        task = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1); 
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks
function clearTasks(){
   // taskList.innerHTML = ''; 

   //Faster way to remove tasks.
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }

   //Clear from LS
   clearTasksFromLocalStorage(); 
}

//Clear Tasks from LS
function clearTasksFromLocalStorage(){
    localStorage.clear(); 
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase(); 

    document.querySelectorAll('.collection-item').forEach(function(tasks){
        const item = task.firstChild.textContent; 
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';  
        } else {
            task.style.display = 'none';  
        }
    });  
}