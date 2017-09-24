var timer = (new function() {
	var stos = [], sivs = [], that = this; 
	this.setTimeout = function(fn, delay) { 
		var id = stos.length; 
		stos[id] = {
			fn: fn, 
			delay: delay, 
			start: new Date().getTime(), 
			id: setTimeout(fn, delay)
		}
		return id; 
	}
	this.clearTimeout = function(id) {
		var sto = stos[id]; 
		if(sto === undefined) return false; 
		// 清空Timeout
		clearTimeout(sto.id); 
		// 删除这个 id
		stos.splice(id, 1); 
		return true; 
	}
	this.pauseTimeout = function(id) { 
		var sto = stos[id]; 
		if(sto === undefined) return false; 
		// 清空Timeout
		clearTimeout(sto.id); 
		var elapse = new Date().getTime() - sto.start; 
		// 重置 delay
		sto.delay = sto.delay - elapse;  
		return true;  
	}
	this.resumeTimeout = function(id) {
		var sto = stos[id]; 
		if(sto === undefined) return false; 
		// 新建一个 timeout 表示继续 
		sto.id = timer.setTimeout(sto.fn, sto.delay); 
		return true;  
	}
	this.setInterval = function(fn, delay) {
		var id = sivs.length; 
		sivs[id] = {
			fn: fn, 
			delay: delay, 
			start: new Date().getTime(), 
			id: setInterval(fn, delay)
		}
		return id; 
	}
	this.clearInterval = function(id) {
		var siv = sivs[id]; 
		if(siv === undefined) return false; 
		// 清空Interval
		clearInterval(siv.id); 
		// 删除这个 id
		sivs.splice(id, 1); 
		return true; 
	}
	this.pauseInterval = function(id) {
		var siv = sivs[id]; 
		if(siv === undefined) return false; 
		// 清空 Interval
		clearInterval(siv.id); 
		var elapse = (new Date().getTime() - siv.start) % siv.delay; 
		// 添加一个 wait 属性
		siv.wait = siv.delay - elapse; 
		return true; 
	}
	this.resumeInterval = function(id) {
		var siv = sivs[id]; 
		if(siv === undefined) return false; 
		// 调一个 setTimeout 执行 wait 的时间
		this.setTimeout(function() {
			siv.fn(); 
			// 新建一个 interval 表示继续
			siv.id = timer.setInterval(siv.fn, siv.delay); 
		}, siv.wait); 
	}

	// 综合 API
	this.pause = function(id) {
		if(id === undefined) {
			// 表示暂停全部 timeout & interval
			stos.forEach(function(item, id) {
				that.pauseTimeout(id); 
			}); 
			sivs.forEach(function(item, id) {
				that.pauseInterval(id); 
			}); 
			return true; 
		}
		else if(stos[id] !== undefined) {
			this.pauseTimeout(id); 
			return true; 
		}
		else if(sivs[id] !== undefined) {
			this.pauseInterval(id); 
			return true; 
		}
		return false; 
	}
	this.resume = function(id) {
		if(id === undefined) {
			// 表示暂停全部 timeout & interval
			stos.forEach(function(item, id) {
				that.resumeTimeout(id); 
			}); 
			sivs.forEach(function(item, id) {
				that.resumeInterval(id); 
			}); 
			return true; 
		}
		else if(stos[id] !== undefined) {
			this.resumeTimeout(id); 
			return true; 
		}
		else if(sivs[id] !== undefined) {
			this.resumeInterval(id); 
			return true; 
		}
		return false; 
	}

}());
