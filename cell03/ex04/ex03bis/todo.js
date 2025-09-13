$(document).ready(function () {
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    function saveTodos() {
        const todos = [];
        $("#ft_list > div").each(function () {
            todos.unshift($(this).text());
        });
        document.cookie = "todoList=" + JSON.stringify(todos) + "; path=/";
    }

    function addTodo(text, save = true) {
        const newDiv = $("<div></div>").text(text);

        newDiv.click(function () {
            if (confirm("Do you want to delete this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $("#ft_list").prepend(newDiv);

        if (save) saveTodos();
    }

    function loadTodos() {
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

    loadTodos();

    $("#addBtn").click(function () {
        const text = $("#todoInput").val().trim();
        if (text !== "") {
            addTodo(text);
            $("#todoInput").val("").focus();
        }
    });

    $("#todoInput").keypress(function (e) {
        if (e.which === 13) {
            $("#addBtn").click();
        }
    });
});
