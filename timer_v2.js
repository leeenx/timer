function Timer() {
    // 构造函数 
    this.constructor = function() { 
        // 暂停状态 - 这是个公共状态，由外部 Ticker 决定。
        this.paused = true; 

        // 队列
        this.queue = new this.Map(); 

        // 正在使用 timer 的 RAF
        this.usingRAF = false; 

        // useRAF 触发器
        Object.defineProperty(this, "useRAF", {
            set: function(value) { 
                this.usingRAF = value; 
                value ? Timer.RAF.enable() : Timer.RAF.disable(); 
            }
        }); 
    }

    var that = this; 

    // 创建一个 Symbol
    this.Symbol = function() {
        return "Symbol_" + new Date().getTime() + "_" + this.Symbol.id++; 
    }

    // 添加一个 id
    this.Symbol.id = 0; 

    // 创建一个 Map 
    this.Map = function() {
        var map = {}; 

        this.set = function (key, value) { 
            map[key] = value; 
            return true; 
        }

        this.get = function(key) {
            if(map[key] !== undefined) return map[key]; 
        }

        this.delete = function(key) {
            if(map[key] !== undefined) {
                delete map[key]; 
                return true; 
            }
        }

        this.forEach = function(fn) { 
            for(var key in map) { 
                fn(map[key], key); 
            }
        }
        this.map = map; 
    }

    // setTimeout 的实现
    this.setTimeout = function(fn, delay, id) { 
        id = id || this.Symbol("timeoutID"); 
        // 存入队列 
        this.queue.set(id, {
            fn: fn, 
            type: 0, 
            paused: 0, 
            elapsed: 0, 
            delay: delay
        }); 
        return id; 
    }

    // clearTimeout
    this.clearTimeout = function(id) {
        return this.delete(id); 
    }

    // setInterval 的实现
    this.setInterval = function(fn, delay, id) { 
        id = id || this.Symbol("intervalID"); 
        // 存入队列
        this.queue.set(id, {
            fn: fn, 
            type: 1, 
            paused: 0, 
            elapsed: 0, 
            delay: delay
        }); 
        return id; 
    }

    // clearInterval
    this.clearInterval = function(id) {
        return this.delete(id); 
    }

    // 修改指定id的 delay/fn
    this.set = function(id, config) { 
        config = config || {}; 
        var item = this.queue.get(id) || {}; 
        for(var key in config) {
            item[key] = config[key]; 
        }
	   return true; 
    }

    // 删除 queue 上的成员
    this.delete = function(id) {
        return this.queue.delete(id); 
    }

    // 暂停指定id
    this.pause = function(id) {
        id === undefined ? this.pauseAll() : ((this.queue.get(id) || {}).paused = 1); 
        return true; 
    }

    // 恢复指定id
    this.resume = function(id) {
        return this.play(id); 
    } 
    
    // 播放指定id
    this.play = function(id) {
        id === undefined ? this.playAll() : ((this.queue.get(id) || {}).paused = 0); 
        return true; 
    } 

    // 清空timer
    this.clean = function() {
        this.queue = new this.Map(); 
        return true; 
    }

    // 暂停全部 id
    this.pauseAll = function() {
        this.queue.forEach(function(item) {item.paused = 1}); 
        return true; 
    }

    // 播放全部 id
    this.playAll = function() {
        this.queue.forEach(function(item) {item.paused = 0}); 
	return true;
    }

    // 重置 elapsed 为 0
    this.reset = function(id) {
        id === undefined ? this.resetAll() : ((this.queue.get(id) || {}).elapsed = 0); 
    }

    // 重置所有的 elapsed 为 0
    this.resetAll = function() {
        this.queue.forEach(function(item) {item.elapsed = 0}); 
    }

    // tick
    this.tick = function(delta) { 
        this.paused || this.updateQueue(delta); 
    }

    // 更新 map 队列
    this.updateQueue = function(delta) { 
        this.queue.forEach(function(item, id) {
            if(item.paused === 1) return; 
            item.elapsed += delta; 
            if(item.elapsed >= item.delay) {
                item.fn(); 
                item.type === 0 ? that.delete(id) : (item.elapsed = 0); 
            } 
        }); 
    }

    // 状态更新
    this.update = function() { 
        // 第一次调用 update 时主动停用原生接口
        this.useRAF = false; 

        // 下面是真正的 update
        this.update = function(delta) {
        	if(this.usingRAF) return; 
	        this.tick(delta); 
        } 
    }

    // 操行构造函数 
    this.constructor(); 
}

function AnimationFrame() { 
    this.constructor = function() {
        this.time = 0; 
        this.auto = this.auto.bind(this); 
    }
    this.auto = function(elapsed) { 
        timer.tick(elapsed - this.time); 
        this.time = elapsed; 
        this.id = requestAnimationFrame(this.auto); 
    }
    this.enable = function() { 
        timer.paused = false; 
        this.id = requestAnimationFrame(this.auto); 
    }
    this.disable = function() {
        cancelAnimationFrame(this.id); 
    }
    // 执行构造函数 
    this.constructor(); 
}

// 原生RAF
Timer.RAF = new AnimationFrame(); 

// 对外接口
var timer = new Timer(); 

// 默认使用原生 RAF
timer.useRAF = true; 
