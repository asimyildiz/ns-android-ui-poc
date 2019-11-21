export default {
    state: {
        activeScreen: null
    },
    mutations: {
        SET_SCREEN(state, screen) {
            state.activeScreen = screen;
        }
    },
    getters: {
        activeScreen(state) {
            return state.activeScreen;
        }
    }
}; 