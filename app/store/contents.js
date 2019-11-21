export default {
    state: {
        categoryId: null,
        totalNumberOfContents: 0,
        contents: null,
        isContentsLoading: false
    },
    mutations: {
        SET_CONTENTS_ARE_LOADING(state, isBeingProcessed) {
            state.isContentsLoading = isBeingProcessed;
        },
        SET_TOTAL_NUMBER_OF_CONTENS(state, totalNumberOfContents) {
            state.totalNumberOfContents = totalNumberOfContents;
        },
        SET_CONTENTS(state, result) {
            state.categoryId = result.categoryId;
            state.contents = result.contents;
            state.isContentsLoading = false;
        }
    },
    getters: {
        isContentsLoading(state) {
            return state.isContentsLoading;
        },
        categoryId(state) {
            return state.categoryId;
        },
        totalNumberOfContents(state) {
            return state.totalNumberOfContents;
        },
        contents(state) {
            return state.contents;
        }
    }
};
