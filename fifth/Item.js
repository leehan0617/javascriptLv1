var Item = (function () {
	var items = {};
	var Item = function (selector) {
		if(typeof selector !== 'string') throw 'Type of selector must be string';

		if(items[selector]) throw 'Already defined Item';
		this._el = items[selector] = selector;

		this._isInitalized = false;
	}
	var fn = Item.prototype;

	fn.init = function (taskManager) {
		if(this._isInitalized) return;
		this._isInitalized = true;

		var el;
		this._el = el = document.querySelector(this._el);
		if(el.parentNode) el.parentNode.removeChild(el);
		this._taskManager = taskManager;
	}

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
	}

	return Item;
})();