var todo = (function(){
	var tasks = [];
	var STATE_P = '진행';
	var STATE_C = '완료';
	var mode = 'console';
	var init , render;

	var html = (function() {
		var progressLi , completeLi;

		return {
			init : function () {
				progressLi = document.querySelector('#todo .progress li');
				completeLi = document.querySelector('#todo .complete li');
				progressLi.parentNode.removeChild(progressLi);
				completeLi.parentNode.removeChild(completeLi);
			},
			render : function () {
				console.log('구현중');
			}
		}
	})();

	var con = (function () {
		return {
			init : function () {
				console.clear();
			},
			render : function () {
				var task;
				console.log('진행');

				for(var i = 0 ; i < tasks.length ; i ++) {
					task = tasks[i];
					if(task.state === '진행') {
						console.log(task.id + '.' + task.title + '(' + task.state + ')');
					}
				}

				console.log('완료');

				for(var i = 0 ; i < tasks.length ; i ++) {
					task = tasks[i];
					if(task.state === '완료') {
						console.log(task.id + '.' + task.title + '(' + task.state + ')');
					}
				}
			}
		}

	})();

	(function() {
		init = (function() {
			return function () {
				if(mode === 'html') html.init();
				else if(mode === 'console') con.init();
			}
		})();

		render = (function() {
			return function () {
				if (mode === 'html') html.render();
				else if (mode === 'console') con.render();
			}
		})();
	})();

	render();

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

	var warning = console.log;

	return {
		init : init,
		add : addTask,
		remove : removeTask,
		toggle : function(id) {
			for(var i = 0 ; i < tasks.length ; i ++) {
				if(tasks[i].id === id) {
					if(task[i].state === STATE_P) {
						changeState(id , STATE_C);
					} else {
						changeState(id , STATE_P);
					} 
					break;
				}
			}
		},
		modeConsole : function () {
			mode = 'console';
		},
		modeHtml : function () {
			mode = 'html';
		}
	}
})();

todo.init();
