const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;

        
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        span.onclick = function () {
            li.remove(); 
            saveData(); 
        };

        li.appendChild(span);
        listContainer.appendChild(li);
        inputBox.value = ""; 
        saveData(); 
    }
}


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked"); 
        saveData(); 
    }
}, false);


function saveData() {
    const tasks = [];
    for (let li of listContainer.children) {
        tasks.push({
            text: li.innerText.slice(0, -1), 
            checked: li.classList.contains("checked") 
        });
    }
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
}

// Function to show tasks from local storage
function showTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || []; 
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.innerHTML = task.text;

        // Create a span for the delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        span.onclick = function () {
            li.remove(); 
            saveData(); 
        };

        li.appendChild(span);
        if (task.checked) {
            li.classList.add("checked"); 
        }
        listContainer.appendChild(li);
    });
}

// Load tasks on page load
showTask();