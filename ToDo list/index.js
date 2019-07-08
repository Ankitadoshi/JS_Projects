
let clear = document.getElementById('clear');
let list = document.getElementById('list');
let input = document.getElementById('add-todo');
let dateElem = document.getElementById('date');
let add = document.getElementsByClassName('add')[0];

let CHECK = "fa-check-circle";
let UNCHECK = "fa-circle-thin";
let LINE_THROUGH="lineThrough";

let options = {weekday:"long", month:"short", day:"numeric"}
let date= new Date()
dateElem.innerHTML = date.toLocaleDateString('en-US', options);

let LIST, id;
let data = localStorage.getItem('LIST');
if(data){
    LIST = JSON.parse(data);
    id=LIST.length;
    loadToDo(LIST);
} else {
    LIST = [];
    id=0;
}

function loadToDo(LIST){
    list.innerHTML="";
    LIST.forEach(element => {
        addToDO(element.todo, element.id, element.done, element.trash);
    });
}
function addToDO(todo, id, done, trash){
    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH:''; 
    if(!trash){
        let temp = `<li class="item">
            <i class="fa ${DONE}" id=${id} job="complete"></i>
            <p class="item-txt ${LINE}">${todo}</p>
            <i class="fa fa-trash" id=${id} job="delete"></i>
        </li>`
        list.insertAdjacentHTML("afterBegin",temp)
    } else {
        return;
    }
    input.value="";
    
}

function completeToDo(elem){
    elem.classList.toggle(CHECK);
    elem.classList.toggle(UNCHECK);
    elem.parentNode.querySelector('.item-txt').classList.toggle(LINE_THROUGH);

    LIST[elem.id].done = LIST[elem.id].done ? false: true;
}

function deleteToDo(elem){
    elem.parentNode.parentNode.removeChild(elem.parentNode);
    LIST[elem.id].trash = true;
}
function clearToDo(){
    localStorage.clear();
    location.reload();
}
add.addEventListener('keyup', function(event){
    if(event.keyCode=== 13){
        var todo = input.value;
        if(todo){
            addToDO(todo, id, false, false);
            LIST.push({id:id, todo:todo, done:false, trash:false});
            localStorage.setItem('LIST', JSON.stringify(LIST));
            id++;
        } 
    }
});
clear.addEventListener('click', function(){
    clearToDo();
    localStorage.removeItem('LIST');
})

list.addEventListener('click', function(event){
    var elem = event.target;
    var job = event.target.attributes.job.value;
    if(job ==="complete"){
        completeToDo(elem);
    } else if(job==="delete"){
        deleteToDo(elem);
    }
    localStorage.setItem('LIST', JSON.stringify(LIST));
});
