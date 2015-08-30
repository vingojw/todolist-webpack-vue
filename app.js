
var Vue = require('vue');

require('bootstrap/dist/css/bootstrap.min.css');
require('./style/app.css');

new Vue({
	el:'#app',
	data:{
		newTask: {title:'',completed:false},
		editingTask: false,
		tasks:[
			{title: 'Go to grocery store', completed: false },
            { title: 'Do the dishes', completed: false },
            { title: 'Call John', completed: true }
        ]
	},
	methods:{
		removeTask: function(task,index){
			 
			//this.tasks.$remove(index);  删除下标
			this.tasks.$remove(task);//删除对象
		},
		addTask:function(){
			if(!this.newTask.title){
				return;
			}
	 		this.tasks.push({
	            title: this.newTask.title,
	            completed: false
	        });

	        this.newTask = { title: '', completed: false};
		},
		startEditingTask:function(task){
			 this.newTask = task;
             this.editingTask = true;
		},
		pressedEnter:function(){
			if(this.editingTask){
				this.removeIfEmpty();
			}else{
				this.addTask();
			}
			this.newTask = { title: '', completed: false};
            this.editingTask = false;
		},
		removeIfEmpty:function(){
			if(!this.newTask.title){
				this.removeTask(this.newTask);
			}
		}
	}
});