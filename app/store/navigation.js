export default {
    state: {
        isNavigating: false
    },
    mutations: {
        SET_IS_NAVIGATING(state, isNavigating) {
            state.isNavigating = isNavigating;
        }
    },
    getters: {
        isNavigating(state) {
            return state.isNavigating;
        }
    }
};
