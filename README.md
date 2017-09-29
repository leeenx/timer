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

## 注意

这个工具是基于原生 setTimeout & setInterval 写的，所以它并不能监测到页面被挂起的状态。我更推荐使用另一个基于 `requestAnimationFrame`的 timer: https://github.com/leeenx/es6-utils#timer
