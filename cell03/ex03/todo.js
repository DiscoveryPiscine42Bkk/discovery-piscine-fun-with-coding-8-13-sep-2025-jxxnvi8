function loadTodos() {
    const ftList = document.getElementById("ft_list");
    const cookie = getCookie("todoList");
    if (cookie) {
        try {
            const todos = JSON.parse(cookie);
            todos.reverse().forEach(todo => addTodo(todo, false));
        } catch (e) {
            console.error("Invalid cookie:", e);
        }
    }
}

function addTodo(text, save = true) {
    const ftList = document.getElementById("ft_list");
    const newDiv = document.createElement("div");
    newDiv.textContent = text;

    newDiv.addEventListener("click", function () {
        if (confirm("Do you want to delete this TO DO?")) {
            ftList.removeChild(newDiv);
            saveTodos();
        }
    });

    ftList.insertBefore(newDiv, ftList.firstChild);
    if (save) saveTodos();
}

function saveTodos() {
    const todos = [];
    const listItems = document.querySelectorAll("#ft_list > div");
    listItems.forEach(item => todos.unshift(item.textContent));
    document.cookie = "todoList=" + JSON.stringify(todos) + "; path=/";
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

window.onload = function () {
    loadTodos();

    const addBtn = document.getElementById("addBtn");
    const input = document.getElementById("todoInput");

    addBtn.addEventListener("click", function () {
        const text = input.value.trim();
        if (text !== "") {
            addTodo(text);
            input.value = "";
            input.focus();
        }
    });

    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addBtn.click();
        }
    });
};
