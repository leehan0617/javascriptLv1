var todo = (function(){
	var tasks = [];
	var STATE_P = '진행';
	var STATE_C = '완료';
	var target;
	var warning = console.log;

	var addTask = (function() {
		var id = 0;

		return function(title) {
			tasks.push({
				id : id ++,
				title : title,
				state : STATE_P
			});

			render();
		}
	})();

	var removeTask = function(id) {
		var whiteList = {id : false};
		for(var i = 0 ; i < tasks.length ; i ++) {
			if(tasks[i].id == id) {
				console.log('test');
				whiteList.id = id;
				break;
			}
		}

		if(whiteList.id === false) {
			warning('removeTask : invalid id - ' + id);
			return;
		}

		for(var i = 0 ; i < tasks.length ; i ++) {
			if(tasks[i].id == whiteList.id) {
				tasks.splice(i , 1);
				break;
			}
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
		toggle : function(id) {
			for(var i = 0 ; i < tasks.length ; i ++) {
				if(tasks[i].id === id) {
					if(task[i].state === STATE_P) changeState(id , STATE_C);
					else changeState(id , STATE_P);
					 
					break;
				}
			}
		},
		setRenderer : function (renderer) {
			if (typeof renderer.init !== 'function' || typeof renderer.render !== 'function') {
				return;
			}

			target = renderer;
			target.init(todo);
		}
	}
})();

var html = (function () {
	var host , progressLi , completeLi;

	return {
		init : function (todo) {
			host = todo;
			progressLi = document.querySelector('#todo .progress li');
			completeLi = document.querySelector('#todo .complete li');
			progressLi.parentNode.removeChild(progressLi);
			completeLi.parentNode.removeChild(completeLi);
		},
		render : function (tasks , STATE_P , STATE_C) {
			if(typeof progressLi === 'undefined' || typeof completeLi === 'undefined') {
				return;
			}

			var progress = document.querySelector('#todo .progress');
			var complete = document.querySelector('#todo .complete');

			progress.innerHTML = '';
			complete.innerHTML = '';

			var task , child , inputs;
			for(var i = 0 ; i < tasks.length ; i ++) {
				task = tasks[i];

				if(task.state === STATE_P) {
					child = progressLi.cloneNode(true);
					child.querySelector('p').innerHTML = task.title;

					inputs = child.querySelectorAll('input');
					inputs[0].setAttribute('data-task-id' , task.id);
					inputs[0].onclick = function () {
						host.toggle(this.getAttribute('data-task-id'));
					}
					inputs[1].setAttribute('data-task-id' , task.id);
					inputs[1].onclick = function () {
						host.remove(this.getAttribute('data-task-id'));
					}

					progress.appendChild(child);
				} else if (task.state === STATE_C) {
					child = completeLi.cloneNode(true);
					child.querySelector('p').innerHTML = task.title;
					inputs = child.querySelectorAll('input');

					inputs[0].setAttribute('data-task-id' , task.id);
					inputs[0].onclick = function () {
						host.toggle(this.getAttribute('data-task-id'));
					}
					inputs[1].setAttribute('data-task-id' , task.id);
					inputs[1].onclick = function () {
						host.remove(this.getAttribute('data-task-id'));
					}
					complete.appendChild(child);
				}
			}

			console.log('할일 입력창을 비운다.');
		}
	}
})();

var con = (function () {
	var host;
	return {
		init : function (todo) {
			host = todo;
			console.clear();
		},
		render : function (tasks , STATE_P , STATE_C) {
			var task;

			console.log('진행');
			for(var i = 0 ; i < tasks.length ; i ++) {
				task = tasks[i];
				if(task.state === STATE_P) {
					console.log(task.id + '.' + task.title + '(' + task.state + ')');
				}
			}

			console.log('완료');
			for(var i = 0 ; i < tasks.length ; i ++) {
				task = tasks[i];
				if(task.state === STATE_C) {
					console.log(task.id + '.' + task.title + '(' + task.state + ')');
				}
			}
		}
	}
})();

todo.setRenderer(html);
