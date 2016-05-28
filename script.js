  var Application = { };
(function (Application) {
    var _document,
        _containner,
        id = 0;
   
    Application.init = function(document) {
       _document = document;
       _container = _document.getElementById("todo-container");
       this.addTaskContainer(_container);
       _container.addEventListener('click',this.proxy(this.containerOnClick, this));
    };
    
    Application.containerOnClick = function(evt){
        console.log(evt.target);
        if(evt.target.hasAttribute('data-action')){
            switch(evt.target.getAttribute('data-action')){
                case 'addTask' : this.onAddTask(evt); break;
                case 'clearTask' : this.onClearTask(evt); break;
                case 'removeTask' : this.onTaskDelete(evt); break;
            }
        }
    };
    
     Application.onClearTask = function(evt){
        var taskContainer = _document.getElementById(evt.target.getAttribute('data-task-container-id'));
        var tasks = _document.querySelectorAll('ul#' + taskContainer.getAttribute('id').toString()+' li');
        
        for (var node in tasks) {
       // document.write(i.id);
        taskContainer.removeChild(tasks[node]);
        }
    };
    
    Application.addTaskContainer = function(baseNode, subTask){
      var containerElement = _document.createElement('ul'),
          addTaskButton = _document.createElement('button'),
          clearTaskButton = _document.createElement('button'),
          id = this.nextId();
        
        containerElement.setAttribute('id', id);
        
        addTaskButton.appendChild(_document.createTextNode(subTask ? 'Add subtask' : 'Add task'));
        addTaskButton.setAttribute('data-task-container-id', id);
        //addTaskButton.setAttribute('data-action','addTask');
        addTaskButton.addEventListener('click',this.proxy(this.onAddTask,this));
        
        clearTaskButton.appendChild( _document.createTextNode(subTask ? 'clear sub-tasks' : 'clear'));
        clearTaskButton.setAttribute('data-task-container-id', id);
        clearTaskButton.setAttribute('data-action','clearTask');
        clearTaskButton.addEventListener('click', this.proxy(this.onClearTask, this));
        baseNode.appendChild(containerElement);
        baseNode.appendChild(addTaskButton);
        baseNode.appendChild(clearTaskButton);
    };
    
    Application.nextId = function(){
        return 'id' + id++;
    };
    
   
   Application.onAddTask = function(evt){
        var taskContainer = _document.getElementById(evt.target.getAttribute('data-task-container-id')),
            newTaskId = this.nextId(),
            newTask = _document.createElement('li'),
            newTaskInput = _document.createElement('input'),
            newTaskDelete = _document.createElement('button');
        
        newTask.setAttribute('id', newTaskId);
        newTaskInput.setAttribute('name','task'+newTaskId);
        
        newTaskDelete.appendChild(document.createTextNode('Delete'));
        newTaskDelete.setAttribute('data-task-id',newTaskId);
        newTaskDelete.setAttribute('data-action', 'removeTask');
        newTaskDelete.addEventListener('click', this.proxy(this.onTaskDelete, this));
        
        newTask.appendChild(newTaskInput);
        newTask.appendChild(newTaskDelete);
        
        this.addTaskContainer(newTask, true);
        taskContainer.appendChild(newTask);
    };
   
    Application.onTaskDelete = function(evt){
        var taskContainer = _document.getElementById(evt.target.getAttribute('data-task-id'));
        taskContainer.parentNode.removeChild(taskContainer);
        };
    
    Application.proxy = function(handler, owner){
        return handler.bind(owner);
    }
}
)(Application);
