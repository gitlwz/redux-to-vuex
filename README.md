Redux To Vuex
=============
> 像书写vuex一样书写redux！

安装
=============
```js
npm install redux-to-vuex
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

你的mian.js就想引入普通的store一样
```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import store from "./models"

ReactDOM.render(<Provider store={store}>
    <App />
</Provider>, document.getElementById('root'));
```
在使用它的组件中如同使用redux一样
```
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

class App extends Component {
    add = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "counter/add",
            payload: "参数"
        })
    }
    dec = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "counter/minus",
            payload: "参数"
        })
    }
    asyncAdd = () => {
        const { dispatch } = this.props;
        dispatch({
            type: "counter/someEffect",
            payload: "参数"
        })
    }
    render() {
        return (
            <div className="App">
                <div className='todo'>
                    <button className='add_btn' onClick={this.add}>+</button>
                    <button className='dec_btn' onClick={this.dec}>-</button>
                    <button className='dec_btn' onClick={this.asyncAdd}>async</button>
                    <div>{this.props.count}</div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ counter }) => {
    const { count } = counter;
    return {
        count
    }
}
export default connect(mapStateToProps)(App);
```
这里有个[例子](https://github.com/gitlwz/redux-to-vuex/tree/master/example)可以让你更清楚如何使用redux-to-vuex
## License

MIT
