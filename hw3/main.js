var todoListData = []
var id = 0

//main
const main = document.getElementById("main");
const input = document.getElementById("todo-input");

const itemList = document.createElement("ul");
itemList.id = "todo-list";
itemList.className = "todo-app__list";

//footer
const footer = document.createElement('div');
footer.id = "todo-footer";
footer.className = "todo-app__footer";

const appTotal = document.createElement('div');
appTotal.className = "todo-app__total";

const todoCount = document.createElement('p');
todoCount.id = "todo-count"
todoCount.innerHTML = "0 left"

appTotal.appendChild(todoCount);

const viewButtons = document.createElement("ul")
viewButtons.className = "todo-app__view-buttons";

const allButton = document.createElement("button");
allButton.type = "button";
allButton.id = "all";
allButton.innerHTML = "All";
allButton.setAttribute("onclick", "onclickAll()");

const activeButton = document.createElement("button");
activeButton.type = "button";
activeButton.id = "active";
activeButton.innerHTML = "Active";
activeButton.setAttribute("onclick", "onclickActive()");

const completedButton = document.createElement("button");
completedButton.type = "button";
completedButton.id = "completed";
completedButton.innerHTML = "Completed";
completedButton.setAttribute("onclick", "onclickCompleted()");

viewButtons.appendChild(document.createElement("li").appendChild(allButton));
viewButtons.appendChild(document.createElement("li").appendChild(activeButton));
viewButtons.appendChild(document.createElement("li").appendChild(completedButton));

const appClean = document.createElement("div");
appClean.className = "todo-app__clean-hide";

const cleanButton = document.createElement("button");
cleanButton.type = "button";
cleanButton.id = "clean";
cleanButton.innerHTML = "Clear completed";
cleanButton.setAttribute("onclick", "onclickClean()");

appClean.appendChild(cleanButton);

footer.appendChild(appTotal);
footer.appendChild(viewButtons);
footer.appendChild(appClean)


input.addEventListener('keyup', event => {
    if(event.keyCode == 13  && event.target.value !== ""){
        if(todoListData.length == 0){
            main.appendChild(itemList)
            main.appendChild(footer)
            
        }
        const item = createNewItem(event.target.value, id);
        itemList.appendChild(item.node)
        todoListData.push(item);
        id += 1
        event.target.value = '';
        calculateTotal();
    }
})

function createNewItem(content, id){
    const itemNode = document.createElement("li");
    const wrapper = document.createElement("div");
    const checkbox = document.createElement("input");
    const label = document.createElement("label");
    checkbox.id = id;
    checkbox.type = "checkbox";
    label.setAttribute("for", id);
    wrapper.appendChild(checkbox);
    wrapper.appendChild(label);
    wrapper.className = "todo-app__checkbox";
    itemNode.appendChild(wrapper);
    itemNode.className = "todo-app__item";
    const head1 = document.createElement("H1");
    head1.className =  "todo-app__item-detail";
    head1.innerHTML = content;
    itemNode.appendChild(head1);
    const image = document.createElement("IMG");
    image.src = "./img/x.png";
    image.className = "todo-app__item-x";
    itemNode.appendChild(image);
    
    newItem = {id: id, node: itemNode, isComplete: false };
    
    checkbox.setAttribute("onclick", "onclickCheck(" + id + ")");
    image.setAttribute("onclick", "onclickX(" + id + ")");
    
    return newItem;

}
    
function onclickCheck(id){
    var id_array = todoListData.map(item => item.id);
    var index = id_array.indexOf(Number(id));
    var complete = !todoListData[index].isComplete;
    todoListData[index].isComplete = complete;
    
    const node = todoListData[index].node
    if(complete === true){
        node.style["textDecoration"] = "line-through";
        node.style["opacity"] = 0.5;
    }
    else if (complete === false){
        node.style["textDecoration"] = "";
        node.style["opacity"] = 1;
    }
    calculateTotal();
}

function onclickX(id){
    var id_array = todoListData.map(item => item.id);
    var index = id_array.indexOf(Number(id));
    var child = todoListData[index].node;
    itemList.removeChild(child);
    todoListData.splice(index, 1);
    calculateTotal();
    if(todoListData.length == 0){
        main.removeChild(footer);
    }
    return;
}

function onclickAll(){
    
    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }
    todoListData.forEach(ele => itemList.appendChild(ele.node));
   
}

function onclickActive(){
    var active = todoListData.filter(ele => !ele.isComplete)
    while (itemList.firstChild ){
        itemList.removeChild(itemList.firstChild)
    }
    active.forEach(ele => itemList.appendChild(ele.node));

}

function onclickCompleted(){
    var completed = todoListData.filter(ele => ele.isComplete)
    while (itemList.firstChild ){
        itemList.removeChild(itemList.firstChild)
    }
    completed.forEach(ele => itemList.appendChild(ele.node));
}

function calculateTotal(){
    var totalLeft = todoListData.filter(ele => !ele.isComplete).length;
    todoCount.innerHTML = totalLeft + " left";
    var completed = todoListData.filter(ele => ele.isComplete).length;
    if(completed > 0){
        appClean.classList.remove("todo-app__clean-hide");
        appClean.classList.add("todo-app__clean");
    }
    else{
        appClean.classList.remove("todo-app__clean");
        appClean.classList.add("todo-app__clean-hide");
    }
}

function onclickClean(){
    var completed = todoListData.filter(ele => ele.isComplete)
    completed = completed.map(ele => ele.id)

    completed.forEach(ele => {
        index = todoListData.map(it => it.id).indexOf(ele);
        console.log(index)
        todoListData.splice(index, 1);
    })
    
    

    while (itemList.firstChild){
        itemList.removeChild(itemList.firstChild)
    }

    todoListData.forEach(ele => itemList.appendChild(ele.node));
    
    calculateTotal();
    if(todoListData.length == 0){
        main.removeChild(footer);
    }
}
