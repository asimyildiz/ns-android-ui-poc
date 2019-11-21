<template></template>

<script type="text/babel">
    import Home from './Home'
    import Live from './Live'
    import Movie from './Movie'
    import MovieDetail from './MovieDetail'
    import Player from './Player'

    export default {
        name: 'abstractScreen',
        created() {
            this.$root.$on('navigate', this.showScreen.bind(this));
        },
        methods: {
            showScreen(id, params) {
                if (!this.$store.getters.isNavigating) {
                    const screen = this.$store.getters.activeScreen;
                    switch (id) {
                        case 'home':
                            if (screen !== 'home') {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Home);
                                console.log('navigate home');
                                //this.$router.push({ name: 'home' });
                            }
                            break;
                        case 'live':
                            if (screen !== 'live') {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Live);
                                console.log('navigate live');
                                //this.$router.push({ name: 'live' });
                            }
                            break;
                        case 'movie':
                            if (screen !== 'movie') {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Movie);
                                console.log('navigate movie');
                                //this.$router.push({ name: 'movie' });
                            }
                            break;
                        case 'player':
                            if (params) {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(Player, {
                                    props: params
                                });
                                console.log('navigate video');
                                //this.$router.push({ name: 'video' });
                            }
                            break;
                        case 'details':
                            if (params) {
                                this.$store.commit('SET_IS_NAVIGATING', true);
                                this.$navigateTo(MovieDetail, {
                                    props: params
                                });
                                console.log('navigate video');
                            }
                    }
                }
            }
        }
    };
</script>
