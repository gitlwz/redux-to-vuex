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