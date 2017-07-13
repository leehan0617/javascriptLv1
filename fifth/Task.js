var Task = (function () {
	var c = {} , p = {};

	var Task = function (title) {
		this._title = title;
		this._state = p;
	}
	var fn = Task.prototype;

	fn.isComplete = function () {
		return this._state === c;
	}

	fn.toggle = function () {
		if(this._state === c) this._state = p;
		else this._state = c;
	}

	fn.toString = function () {return this._title;}

	return Task;
})();