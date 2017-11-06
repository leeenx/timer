# timer
一个基于原生 setTimeout & setInterval 的时间轴管理工具，它的 APIs 如下：

| name | type | syntax | detail |
| :-- | :-- | :-- | :-- |
| setTimeout | Function | let setTimeoutID = timer.setTimeout(fun, delay) | 替代原生setTimeout |
| clearTimeout | Function | timer.clearTimeout(setTimeoutID) | 清除timer.setTimeout |
| setInterval | Function | let setIntervalID = timer.setInterval(fun, delay) | 替代原生setInterval |
| clearInterval | Function | timer.clearInterval(setIntervalID) | 清除timer.clearInterval |
| pauseTimeout | Function | timer.pauseTimeout(setTimeoutID) | 暂停指定ID的setTimeout |
| resumeTimeout | Function | timer.resumeTimeout(setTimeoutID) | 恢复指定ID的setTimeout |
| pauseInterval | Function | timer.pauseInterval(setIntervalID) | 暂停指定ID的setInterval |
| resumeInterval | Function | timer.resumeInterval(setIntervalID) | 恢复指定ID的setInterval |
| pause | Function | timer.pause(setTimeoutID/setIntervalID) | 暂停指定ID的计时，如果没指定ID表示暂停所有计时 |
| resume | Function | timer.resume(setTimeoutID/setIntervalID) | 恢复指定ID的计时，如果没指定ID表示恢复所有计时 |
| cleanTimeout | Function | timer.cleanTimeout() | 清空所有的 timer.setTimeout |
| cleanInterval | Function | timer.cleanInterval() | 清空所有的 timer.setInterval |
| clean | Function | timer.clean() | 清空所有的 timer.setTimeout & timer.setInterval |

## 注意

这个工具是基于原生 setTimeout & setInterval 写的，所以它并不能监测到页面被挂起的状态。我更推荐使用另一个基于 `requestAnimationFrame`的 timer: https://github.com/leeenx/es6-utils#timer

# timer_v2
一个基于 RAF 的时间管理工具，它的APIs 如下:

| name | type | syntax | detail |
| :-- | :-- | :-- | :-- |
| setTimeout | Function | let setTimeoutID = timer.setTimeout(fun, delay[, id]) | 替代原生setTimeout，第三个参数表示指定一个有意义的setTimeoutID |
| clearTimeout | Function | timer.clearTimeout(setTimeoutID) | 清除timer.setTimeout |
| setInterval | Function | let setIntervalID = timer.setInterval(fun, delay[, id]) | 替代原生setInterval，第三个参数表示指定一个有意义的setIntervalID |
| clearInterval | Function | timer.clearInterval(setIntervalID) | 清除timer.clearInterval |
| delete | Function | timer.delete(setTimeoutID/setIntervalID) | 相当于clearTimeout & clearInterval |
| pause | Function | timer.pause(setTimeoutID/setIntervalID) | 暂停指定ID的计时，如果没指定ID表示暂停所有计时 |
| resume | Function | timer.resume(setTimeoutID/setIntervalID) | 恢复指定ID的计时，如果没指定ID表示恢复所有计时 |
| play | Function | timer.play(setTimeoutID/setIntervalID) | 同 resume |
| pauseAll | Function | timer.pauseAll() | 暂停所有计时 |
| playAll | Function | timer.playAll() | 恢复所有计时 | 
| clean | Function | timer.clean() | 清空所有计时 |
| set | Function | timer.set(id, {fn, delay}) | 重置timer的回调函数与delay |
| useRAF | Boolean | timer.useRAF = true / false | true 表示启用自身RAF，false 反之。与第三方ticker结合时，timer 会自动切换 |

`timer_v2` 只是 [https://github.com/leeenx/es6-utils/blob/master/modules/timer.js](https://github.com/leeenx/es6-utils/blob/master/modules/timer.js) 的 ES5 版本。只是因为有一些项目需要降级使用 ES5 所以迁移过来的，如果移动端开始，建议使用这个 timer
