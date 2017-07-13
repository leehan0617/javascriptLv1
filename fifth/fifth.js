var STATE = (function () {
	var p = {toString : function () {return '진행';}}
	var c = {toString : function () {return '완료';}}

	return {
		PROGRESS : function {return p;},
		COMPLETE : function {return c;}
	}
})();

var Task = (function () {
	var p = {} , c = {};
	// 쉐도잉 기법 , 안쪽 스코프의 변수명과 바깥쪽에서 사용할 변수이름을 똑같이 하면,
	// 스코프 안쪽에서는 바깥쪽에 있는 변수를 알 수 없게 된다.
	var Task = function (title) {
		this._title = title;
		this._state = p;
	}
	Task.prototype.isComplete = function () {
		return this._state === c;
	}
	Task.prototype.toggle = function () {
		if(this._state === c) this._state = p;
		else this._state = c;
	}
	Task.prototype.toString = function () {
		return this._title;
	}
	return Task;
})();

var TaskManager = (function () {
	var TaskManager = function () {
		this._tasks = [];
		this._renderer = null;
	}

	var fn = TaskManager.prototype;

	fn._checkTask = function (task) {
		return (task instanceof Task) && (this._tasks.indexOf(task) > -1);
	}
	fn._render = function () {
		this._renderer.render(this._tasks.slice(0));
	};
	fn.setRenderer = function (renderer) {
		if(!(renderer instanceof Renderer)) return;
		this._renderer = renderer;
		renderer.init(this);
	};
	fn.add = function (title) {
		this._tasks.push(new Task(title));
		this._render();
	};
	fn.remove = function (task) {
		var tasks = this._tasks;
		if(this._checkTask(task)) tasks.splice(indexOf(task) , 1);
		this._render();
	};
	fn.toggle = function (task) {
		if(this._checkTask(task)) task.toggle();
		this._render();
	};

	return TaskManager;
})();

var Renderer = function () {};
Renderer.prototype.init = function (taskManager) {
	this._taskManager = taskManager;
	this._init();
};
Renderer.prototype.render = function(tasks) {
	this._tasks = tasks;
	this._render();
};
Renderer.prototype._init = function () {
	// override를 강제하기 위한 구문
	throw '_init must bd override';
};
Renderer.prototype._render = function () {
	throw '_render must be override';
};

var ListManager = (function () {
	var ListManager = function (add , pList , cList) {
		if(typeof add !== 'function') throw 'add is not a function';
		if(!(pList instanceof List) || !(cList instanceof List)) {
			throw 'list object must be created with new';
		}

		this._add = add;
		this._pList = pList;
		this._cList = cList;
		this._isInitalized = false;
	};

	var fn = ListManager.prototype = new Renderer();
	fn._init = function () {
		if(this._isInitalized) return;
		this._isInitalized = true;
		this._add(this._taskManager);
		this._pList.init(this._taskManager);
		this._cList.init(this._taskManager);
	}

	fn._render = function () {
		var task;
		this._pList.clear();
		this._cList.clear();
		for(var i = 0 ; i < this._tasks.length ; i ++) {
			task = this._tasks[i];
			if(task.isComplete()) this._cList.add(task);
			else this._pList.add(task);
		}	
	}

	return ListManager;
})();

var List = (function () {
	var containers = {};
	var List = function (selector , item) {

		if(!(item instanceof Item)) throw 'item object must be created with new';

		if(typeof selector !== 'string') throw 'Type of selector must be string';

		if(containers[selector]) throw 'Already defined List';

		this._el = containers[selector] = selector;
		this._item = item;
		this._isInitalized = false;
	}

	fn = List.prototype;
	fn.init = function (taskManager) {
		if(this._isInitalized) return;
		this._isInitalized = true;

		this._el = document.querySelector(this._el);
		this._item.init(taskManager);
	};
	fn.clear = function () {
		this._el.innerHTML = '';
	};
	fn.add = function (task) {
		this._el.appendChild(this._item.add(task));
	};

	return List;
})();

var Item = (function () {
	var items = {};
	var Item = function (selector) {
		if(typeof selector !== 'string') throw 'Type of selector must be string';

		if(items[selector]) throw 'Already defined Item';

		this._el = items[selector] = selector;
		this._isInitalized = false;
	}

	fn = Item.prototype;
	fn.init = function (taskManager) {
		if(this._isInitalized) return;
		this._isInitalized = true;

		var el;
		this._el = el = document.querySelector(this._el);
		if(el.parentNode) el.parentNode.removeChild(el);
		this._taskManager = taskManager;
	};
	fn.add = function (task) {
		var el = this._el.cloneNode(true);
		el.querySelector('p').innerHTML = task;

		var taskManager = this._taskManager;
		var btns = el.querySelectorAll('input');
		btns[0].onclick = function () {
			taskManager.toggle(task);
		}
		btns[1].onclick = function () {
			taskManager.remove(task);
		}

		return el;
	};

	return Item;
})();

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

var progressItem = new Item('#todo .progress li');
var completeItem = new Item('#todo .complete li');

var progressList = new List('#todo .progress' , progressItem);
var completeList = new List('#todo .complete' , completeItem);

var add = function (taskManager) {

	var title = document.querySelector('#todo .title');

	document.querySelector('#todo .add').onsubmit = function () {
		var v = title.value.trim();
		if(v) taskManager.add(v);
		title.value = '';
		return false;
	}
}

var htmlListManager = new ListManager(add , progressList , completeList);
var todo = new TaskManager();
todo.setRenderer(htmlListManager);



