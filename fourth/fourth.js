var STATE = (function () {
	var p = {toString : function () {return '진행';}}
	var c = {toString : function () {return '완료';}}

	return {
		PROGRESS : function {return p;},
		COMPLETE : function {return c;}
	}
})();

var todo = (function(){
	var tasks = [];
	var target;
	var warning = console.log;

	var addTask = (function() {
		var id = 0;

		return function(title) {
			var result = id;
			tasks.push({
				id : id ++,
				title : title,
				state : STATE.PROGRESS()
			});

			render();
			return result;
		}
	})();

	var removeTask = function(id) {
		var isRemoved = false;
		for(var i = 0 ; i < tasks.length ; i ++) {
			if(tasks[i].id === id) {
				tasks.splice(i,1);
				isRemoved = true;
				break;
			}
		}

		if(!isRemoved) {
			warning('removeTask : invalid id - ' + id);
		}

		render();
	}

	var changeState = function(id , state) {
		var ID = false, STATE;

		for(var i = 0 ; i < tasks.length ; i ++) {
			if(tasks[i].id === id) {
				ID = id;
				break;	
			}
		}

		if(ID === false) {
			warning('changeState : invalid id - ' + id);
			return;
		}

		STATE = state;

		for(var i = 0 ; i < tasks.length ; i ++) {
			if(tasks[i].id === whiteList.id) {
				tasks[i].state = STATE;
				break;
			}
		}

		render();
	}

	var render = function () {
		target.render(Object.assign(tasks));
	}

	return {
		add : addTask,
		remove : removeTask,
		toggle : function (id) {
			for(var i = 0 ; i < tasks.length ; i ++) {
				if(tasks[i].id === id) {
					if(task[i].state === STATE.PROGRESS()) changeState(id , STATE.COMPLETE());
					else changeState(id , STATE.PROGRESS());
					 
					break;
				}
			}
		},
		setRenderer : function (renderer) {
			if(!(renderer instanceof Renderer)) return;
			target = renderer;
			target.init(todo);
		}
	}
})();

var Renderer = function () {};
Renderer.prototype.init = function (todo) {
	this.todo = todo;
	this._init();
};
Renderer.prototype.render = function(tasks) {
	this.tasks = tasks;
	this._render();
};
Renderer.prototype._init = function () {};
Renderer.prototype._render = function () {};

var Html = function () {};
Html.prototype = new Renderer();
Html.prototype._init = function () {
	this.progressLi = document.querySelector('#todo .progress li');
	this.completeLi = document.querySelector('#todo .complete li');

	this.progressLi.parentNode.removeChild(progressLi);
	this.completeLi.parentNode.removeChild(completeLi);

	// 할일 입력창 찾기
	// 추가버튼에 이벤트 주기 (todo.addTask)
};
Html.prototype._render = function () {
	if(typeof this.progressLi === 'undefined' || typeof this.completeLi === 'undefined') {
		return;
	}

	var progress = document.querySelector('#todo .progress');
	var complete = document.querySelector('#todo .complete');

	progress.innerHTML = '';
	complete.innerHTML = '';

	var task , child , inputs;
	for(var i = 0 ; i < this.tasks.length ; i ++) {
		task = this.tasks[i];

		if(task.state === STATE.PROGRESS()) {
			child = progressLi.cloneNode(true); // true 를 하면 노드의 자식까지 모두 복제
			child.querySelector('p').innerHTML = task.title;
			inputs = child.querySelectorAll('input');

			inputs[0].setAttribute('data-task-id' , task.id);
			inputs[0].onclick = function () {
				this.todo.toggle(this.getAttribute('data-task-id'));
			}
			inputs[1].setAttribute('data-task-id' , task.id);
			inputs[1].onclick = function () {
				this.todo.remove(this.getAttribute('data-task-id'));
			}

			progress.appendChild(child);
		} else if (task.state === STATE.COMPLETE()) {
			child = completeLi.cloneNode(true);
			child.querySelector('p').innerHTML = task.title;
			inputs = child.querySelectorAll('input');

			inputs[0].setAttribute('data-task-id' , task.id);
			inputs[0].onclick = function () {
				this.todo.toggle(this.getAttribute('data-task-id'));
			}
			inputs[1].setAttribute('data-task-id' , task.id);
			inputs[1].onclick = function () {
				this.todo.remove(this.getAttribute('data-task-id'));
			}
			complete.appendChild(child);
		}
	}

	console.log('할일 입력창을 비운다.');
};
var Con = function () {};
Con.prototype = new Renderer();
Con.prototype._init = function () {
	console.clear();
};
Con.prototype._render = function () {
	var task;
	console.log('진행');

	for(var i = 0 ; i < this.tasks.length ; i ++) {
		task = this.tasks[i];
		if(task.state == STATE.PROGRESS()) {
			console.log(task.id + '.' + task.title + '(' + task.state + ')');
		}
	}

	console.log('완료');

	for(var i = 0 ; i < this.tasks.length ; i ++) {
		task = this.tasks[i];
		if(task.state === STATE.COMPLETE()) {
			console.log(task.id + '.' + task.title + '(' + task.state + ')');
		}
	}
};

var html = new Html();
var con = new Con();

todo.setRenderer(html);