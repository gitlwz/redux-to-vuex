// 常量 存放副作用type相对应的方法
const effectsMethod = {}

/**
 * 还原reducer的函数
 * @param {Object} model 传入的model对象
 */
const reductionReducer = (model) => {
    if (typeof model !== 'object') {
        throw Error('Model必需是个对象！')
    }

    const {
        namespace,
        reducers
    } = model

    if (!namespace || typeof namespace !== 'string') {
        throw Error(`namespace必需存才且为字符串： ${namespace}`)
    }
    if (!reducers || typeof reducers !== 'object') {
        throw Error(`reducers必需存才且为对象： ${namespace}`)
    }

    const initState = model.state
    const reducerArr = Object.keys(reducers || {})

    reducerArr.forEach((reducer) => {
        if (typeof model.reducers[reducer] !== 'function') {
            throw Error(`${namespace}/reducers下的${reducer}必需是个函数`)
        }
    })

    // 该函数即redux函数
    return (state = initState, action) => {
        let result = state
        reducerArr.forEach((reducer) => {
            // 返回匹配的action
            if (action.type === `${namespace}/${reducer}`) {
                result = model.reducers[reducer](state, action)
                return;
            }
        })
        return result
    }
}

/**
 * 还原effects的函数
 * @param {Object} model
 */
const reductionEffects = (model) => {
    const {
        namespace,
        effects
    } = model
    const effectsArr = Object.keys(effects || {})
    if (!effects || typeof effects !== 'object') {
        throw Error(`effects必需存才且为对象： ${namespace}`)
    }
    effectsArr.forEach((effect) => {
        if (typeof model.effects[effect] !== 'function') {
            throw Error(`${namespace}/effects下的${effect}必需是个函数`)
        }
        // 存放对应effect的type和方法
        effectsMethod[`${namespace}/${effect}`] = model.effects[effect]
    })
}

/**
 * 处理effect的中间件 具体参考redux中间件
 * @param {Object} store
 */
const effectMiddler = store => next => (action) => {
    // 如果存在对应的effect， 调用其方法
    const _effect = effectsMethod[action.type]
    if (typeof _effect === 'function') {
        return _effect(action, store);
    }
    return next(action)
}

/**
 * @param {Object} models
 */
const simplifyRedux = (models) => {
    if (typeof models !== 'object') {
        throw Error('Models必需是个对象!')
    }
    // 初始化一个reducers 最后传给combinReducer的值 也是最终还原的redux
    const reducers = {}
    // 遍历传入的model
    const modelArr = Object.keys(models)
    modelArr.forEach((key) => {
        const model = models[key]
        // 还原effect
        reductionEffects(model)
        // 还原reducer，同时通过namespace属性处理命名空间
        const reducer = reductionReducer(model)
        reducers[model.namespace] = reducer
    })
    // 返回一个reducers和一个专门处理副作用的中间件
    return {
        reducers,
        effectMiddler
    }
}

export default simplifyRedux