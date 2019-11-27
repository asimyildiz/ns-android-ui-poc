<template></template>

<script type="text/babel">
    import Home from './Home'
    import Live from './Live'
    import Movie from './Movie'
    import MovieDetail from './MovieDetail'
    import Player from './Player'
    
    export default {
        name: 'abstractScreen',
        /**
         * listen to navigate event when AbstractScreen is created
         * all screens need to be extended from AbstractScreen
         */
        created() {
            this.$root.$on('navigate', this.showScreen.bind(this));            
        },
        methods: {
            /**
             * navigate to a screen
             * @param {String} id - id of the screen to navigate
             * @param {Object} params - params passed to the screen
             */
            showScreen(id, params) {
                if (!this.$store.getters.isNavigating) {
                    const screen = this.$store.getters.activeScreen;
                    switch (id) {
                        case 'home':
                            if (screen !== 'home') {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Home);                                
                            }
                            break;
                        case 'live':
                            if (screen !== 'live') {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Live);                                
                            }
                            break;
                        case 'movie':
                            if (screen !== 'movie') {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Movie);                                
                            }
                            break;
                        case 'player':
                            if (params) {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Player, {
                                    props: params
                                });                                
                            }
                            break;
                        case 'details':
                            if (params) {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(MovieDetail, {
                                    props: params
                                });                                
                            }
                    }
                }
            }
        }
    };
</script>
