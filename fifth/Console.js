var Con = (function () {
	var Con = function () {};
	var fn = Con.prototype = new Renderer();
	fn._init = function () {
		console.clear();
	}
	fn._render = function () {
		var task;
		var n = 1;

		console.log('진행');
		for(var i = 0 ; i < this._tasks.length ; i ++) {
			task = this_tasks[i];
			if(!task.isComplete()) {
				console.log(n++ , '. ' , task);
			}
		}

		n = 1;

		console.log('완료');
		for(var i = 0 ; i < this._tasks.length ; i ++) {
			task = this._tasks[i];
			if(task.isComplete()) {
				console.log(n++ , '. ' , task);
			}
		}
	}
})();