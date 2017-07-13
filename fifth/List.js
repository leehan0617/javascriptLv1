var List = (function () {
	var containers = {};
	var List = function (selector , item) {
		if(!(item instanceof Item)) throw 'item object must be created with new';

		if(typeof selector !== 'string') throw 'Type of selector must be string';

		if(containers[selector]) throw 'Already defined List';

		this._el = containers[selector] = selector;
		this._item = item;
	}
	var fn = List.prototype;
	fn.init = function (taskManager) {
		if(this._isInitalized) return;
		this._isInitalized = true;

		this._el = document.querySelector(this._el);
		this._item.init(taskManager);
	}

	fn.clear = function () {
		this._el.innerHTML = '';
	}

	fn.add = function (task) {
		this._el.appendChild(this._item.add(task));
	}

	return List;
})();