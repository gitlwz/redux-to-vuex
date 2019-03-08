Redux To Vuex
=============
> 像书写vuex一样书写redux！

安装
=============
```js
npm install redux-thunk
```
使用
=============
如果你使用过dva那么redux-to-vuex跟他很像，但是redux-to-vuex只是改造actions、reducers,并没有重写，因此在类似taro这种项目中，不适合使用dva或者无法忍受redux复杂的书写，可以尝试使用redux-to-vuex。

**models/model**
```
export default {
    // 命名空间
    namespace: 'counter',
    // 初始化state
    state: {
        count: 0,
    },
    // reducers 同步更新 类似于vuex的mutations
    reducers: {
        add(state, action) {
            return {
                ...state,
                count: state.count + 1
            }
        },
    },
    // reducers 异步更新 类似于vuex的actions
    effects: {
        someEffect(action, { dispatch }) {
            setTimeout(() => {
                dispatch({
                    type: "counter/add"
                })
            }, 2000)
            return 
        }
    }
}
```
**models/index**
```
import reduxToVuex from 'redux-to-vuex'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'

//model
import counter from './counter'

const reduxTree = reduxToVuex({
    counter
})

const middlewares = [
    reduxTree.effectMiddler,
    createLogger()
]
const store = createStore(combineReducers(reduxTree.reducers), applyMiddleware(...middlewares))
export default store
```

其他地方同使用 redux 一样！
## License

MIT
