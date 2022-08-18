/** Load in tasks of selected user by taking their id from the URL **/
const queryString = window.location.search;
let id = queryString.split('=')[1];
console.log(id);

/** All tasks are loaded on screen by default on first launch **/
let counter = 0;
loadTasks(getAllTasks);

/** Main function that loads in specified tasks into the tab bar based on button clicked. **/
function showTasks(evt, taskId, taskType){
var tabcontent = document.getElementsByClassName("tabcontent").item(0);
tabcontent.style.display = "none";
// Get all elements with class="tablinks" and remove the class "active"
tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
let mainDataElement = document.getElementById(taskId)
mainDataElement.style.display = "block";
evt.currentTarget.className += " active";
mainDataElement.innerHTML = '';
loadTasks(taskType);
}

/** Load in specified tasks with fetch API (function to be passed to showTasks)**/
function loadTasks(getSelectedTasks){
    fetch('https://jsonplaceholder.typicode.com/todos?userId='+id)
    .then(response => {
        if(!response.ok){
            throw Error("ERROR: response fail.");
        }
        return response.json();
    }).then(data => {
        console.log(data);
        let htmlData = data.map(userData =>{
        return getSelectedTasks(userData);
        }).join('');
        htmlData += "</div>";
        console.log(htmlData);
        document.querySelector("#page").insertAdjacentHTML("afterbegin",htmlData);
    }).catch(error => {
        console.log(error);
});
counter = 0;
}


/** 3 Types of task get functions **/
function getAllTasks(data){
    let taskCompleted = data.completed? "checked" : "";
            if(data.id%20 == 1){
                return `<div id="task"><h1>User: ${data.userId}</h1><label class="container">Task: ${data.title} <input type=checkbox ${taskCompleted}><span class="checkmark"></span></label>`;
            } else if(data.id%20 == 0){
                return `<label  class="container">Task: ${data.title} <input type=checkbox ${taskCompleted}><span class="checkmark"></span></label></div>`;
            } else {
                return `<label  class="container">Task: ${data.title} <input type=checkbox ${taskCompleted}><span class="checkmark"></span></label>`;
            }
}

function getCompletedTasks(data){
    let taskCompleted = data.completed? "checked" : "";
    if(counter == 0 && taskCompleted){
        counter++;
        return `<div id="task">`
    }else if(counter == 1 && taskCompleted){
        counter++;
        return `<h1>User: ${data.userId}</h1><label  class="container">Task: ${data.title} <input type=checkbox ${taskCompleted}><span class="checkmark"></span></label>`;
    }else if(counter > 1 && taskCompleted){
        return `<label  class="container">Task: ${data.title} <input type=checkbox ${taskCompleted}><span class="checkmark"></span></label>`;
    }
    
}

function getUncompletedTasks(data){
    if(!data.completed){
    if(data.id%20 == 1){
        return `<div id="task"><h1>User: ${data.userId}</h1><label class="container">Task: ${data.title} <input type=checkbox><span class="checkmark"></span></label>`;
    } else if(data.id%20 == 0){
        return `<label  class="container">Task: ${data.title} <input type=checkbox><span class="checkmark"></span></label></div>`;
    } else {
        return `<label  class="container">Task: ${data.title} <input type=checkbox><span class="checkmark"></span></label>`;
    }
}
}