# timer
一个基于 RAF 的时间管理工具，它的APIs 如下:

| name | type | syntax | detail |
| :-- | :-- | :-- | :-- |
| setTimeout | Function | let setTimeoutID = timer.setTimeout(fun, delay[, id]) | 替代原生setTimeout，第三个参数表示指定一个有意义的setTimeoutID |
| clearTimeout | Function | timer.clearTimeout(setTimeoutID1, setTimeoutID2, ...) | 清除timer.setTimeout |
| setInterval | Function | let setIntervalID = timer.setInterval(fun, delay[, id]) | 替代原生setInterval，第三个参数表示指定一个有意义的setIntervalID |
| clearInterval | Function | timer.clearInterval(setIntervalID1, setIntervalID2, ...) | 清除timer.clearInterval |
| delete | Function | timer.delete(id1, id2, ...) | 相当于clearTimeout & clearInterval |
| pause | Function | timer.pause(setTimeoutID/setIntervalID) | 暂停指定ID的计时，如果没指定ID表示暂停所有计时 |
| resume | Function | timer.resume(setTimeoutID/setIntervalID) | 恢复指定ID的计时，如果没指定ID表示恢复所有计时 |
| play | Function | timer.play(setTimeoutID/setIntervalID) | 同 resume |
| pauseAll | Function | timer.pauseAll() | 暂停所有计时 |
| playAll | Function | timer.playAll() | 恢复所有计时 | 
| clean | Function | timer.clean() | 清空所有计时 |
| set | Function | timer.set(id, {fn, delay}) | 重置timer的回调函数与delay |
| reset | Function | timer.reset(id) | 调用reset后，指定ID的计时会被置零 |
| resetAll | Function | timer.resetAll() | 调用resetAll后，所有计时会被置零 |
| useRAF | Boolean | timer.useRAF = true / false | true 表示启用自身RAF，false 反之。与第三方ticker结合时，timer 会自动切换 |

`timer_v2` 只是 [https://github.com/leeenx/es6-utils/blob/master/modules/timer.js](https://github.com/leeenx/es6-utils/blob/master/modules/timer.js) 的 ES5 版本。

如果不支持 RAF 的浏览器，需要自己添加一个 RAF 的 poly-fill。像我直接使用以下代码：

```javascript
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() {
            callback(currTime + timeToCall);
        }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
}());
```


