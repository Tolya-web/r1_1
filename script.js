
let addMessage = document.querySelector('.message'),
   addButton = document.querySelector('.add'),
   todo = document.querySelector('.todo');

let todolist = [];

if(localStorage.getItem('todo')){
    todolist = JSON.parse(localStorage.getItem('todo'));
    displayMessages()
    alert("обозначение важных данных нажатие правой кнопки мышки")
    alert("удаление строки кнопка ctrl+правая кнопка мышки, либо meta+правая кнопка мышки")
}

addButton.addEventListener('click',function(){

    if(!addMessage.value)return;   /*запрет ввода пустой строки*/ 
    let newTodo = {                /**создание массива */
        todo: addMessage.value,
        checked: false,
        important: false
    };

    todolist.push(newTodo);  /*добовление  li в пустой массив*/
    displayMessages();
    localStorage.setItem('todo', JSON.stringify(todolist));
   
});

function displayMessages(){
    let displayMessage = '';
    if(todolist.length === 0) todo.innerHTML = '';
    todolist.forEach(function(item, i){
        displayMessage += `
        <li>
        <input type='checkbox' id='item_${i}' ${item. checked ? 'checked' : ''}>   
        <label for='item_${i}' class="${item. important? 'important' : ''}">${item.todo}</label>
        </li>  
        `;
        todo.innerHTML = displayMessage;
    });
}

todo.addEventListener('change', function(event){
    let idInput = event.target.getAttribute('id');
    let forLabel = todo.querySelector('[for='+ idInput +']');
    let valueLabel = forLabel.innerHTML;

    todolist.forEach(function(item){
        if(item.todo === valueLabel){
            item.checked = !item.checked;
            localStorage.setItem('todo', JSON.stringify(todolist)); /**сохранение данных */
        }
    });

});

todo.addEventListener('contextmenu', function(event){
    event.preventDefault();
    todolist.forEach(function(item, i){
        if(item.todo === event.target.innerHTML){   
            if(event.ctrlKey || event.metaKey){    /*удаление с помощью сочетаний клавиш*/ 
                todolist.splice(i, 1);
            } else{
                item.important = !item.important;
            }
            displayMessages();
            localStorage. setItem('todo', JSON.stringify(todolist));
           
        }
    });
});

/*Функция поиска и отбора */ 

let filter = function () {
    let input = document.getElementById('input');

    input.addEventListener('keyup', function () {
        let filter = input.value.toLowerCase(),
            filterItems = document.querySelectorAll('#list li');

        filterItems.forEach(item => {
            if (item.innerHTML.toLowerCase().indexOf(filter) > -1) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        })

    })

};

filter();

