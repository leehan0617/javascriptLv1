var tasks = [];
var STATE_P = '진행';
var STATE_C = '완료';

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
	var whiteList = {id : false , state : ''};

	for(var i = 0 ; i < tasks.length ; i ++) {
		if(tasks[i].id === id) {
			whiteList.id = id;
			break;	
		}
	}

	if(whiteList.id === false) {
		warning('changeState : invalid id - ' + id);
		return;
	}

	if(STATE_P !== state && STATE_C !== state) {
		warning('changeState : invalid state - ' + state);
	} else {
		whiteList.state = state;
	}


	for(var i = 0 ; i < tasks.length ; i ++) {
		if(tasks[i].id === whiteList.id) {
			tasks[i].state = whiteList.state;
			break;
		}
	}

	render();
}

var render = function() {
	console.log('진행');

	var task;

	for(var i = 0 ; i < tasks.length ; i ++) {
		task = tasks[i];

		if(task.state === STATE_P) {
			console.log(task.id + '.' , task.title + '(' + task.state + ')');
		}
	}

	console.log('완료');

	for(var i = 0 ; i < tasks.length ; i ++) {
		task = tasks[i];
		if(task.state === STATE_C) {
			console.log(task.id + '.' , task.title + '(' + task.state + ')');
		}
	}
}

var warning = console.log;