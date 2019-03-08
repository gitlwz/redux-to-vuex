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
        minus(state, action) {
            return {
                ...state,
                count: state.count - 1
            }
        }
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