export default {
    state: {
        categories: null,
        isCategoryLoading: false
    },
    mutations: {
        SET_CATEGORY_IS_LOADING(state, isCategoryLoading) {
            state.isCategoryLoading = isCategoryLoading;
        },
        SET_CATEGORIES(state, categories) {
            state.categories = categories;
            state.isCategoryLoading = false;
        }
    },
    getters: {
        isCategoryLoading(state) {
            return state.isCategoryLoading;
        },
        categories(state) {
            return state.categories;
        }
    }
};
