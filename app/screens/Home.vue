<template>
    <Page @loaded="onLoaded" @navigatedTo="onNavigatedTo">
        <!-- Screen elements that need to be within the overscan safe area go here -->
        <GridLayout rows="*" columns="2*, 5*">
            <Menu ref="navigation" id="navigation" col="0" />
            <ScrollView col="1">
                <GridLayout rows="240, *, *, *, *, *" columns="*" verticalAlignment="center">
                    <RadListView id="home_list" for="app in apps" orientation="horizontal" col="0" row="1" itemInsertAnimation="Scale">
                        <v-template>
                            <Button class="appIcon" width="180" height="120" :style="{ 'background-image': 'url(\'' + app.image + '\')' }" @loaded="loaded" @tap="loadApplication"></Button>
                        </v-template>
                    </RadListView>

                    <RadListView id="movie_list" ref="listView" for="movie in movies" orientation="horizontal" col="0" row="2">
                        <v-template>
                            <Button class="appIcon" width="180" height="220" :id="movie.id" :style="{ 'background-image': 'url(\'' + movie.poster + '\')' }" @loaded="loaded" @tap="loadMovie"></Button>
                        </v-template>
                    </RadListView>

                    <RadListView ref="listView" for="sport in sports" orientation="horizontal" col="0" row="3">
                        <v-template>
                            <Button class="appIcon" width="180" height="120" :style="{ 'background-image': 'url(\'' + sport.image + '\')' }" @loaded="loaded" @tap="loadApplication"></Button>
                        </v-template>
                    </RadListView>

                    <RadListView ref="listView" for="app in apps" orientation="horizontal" col="0" row="4">
                        <v-template>
                            <Button class="appIcon" width="180" height="120" :style="{ 'background-image': 'url(\'' + app.image + '\')' }" @loaded="loaded" @tap="loadApplication"></Button>
                        </v-template>
                    </RadListView>

                    <RadListView ref="listView" for="app in apps" orientation="horizontal" col="0" row="5">
                        <v-template>
                            <Button class="appIcon" width="180" height="120" :style="{ 'background-image': 'url(\'' + app.image + '\')' }" @loaded="loaded" @tap="loadApplication"></Button>
                        </v-template>
                    </RadListView>
                </GridLayout>
            </ScrollView>
        </GridLayout>
    </Page>
</template>

<script type="text/babel">
    import AbstractScreen from './AbstractScreen'
    import Menu from '../widgets/Menu'
    import ContentDetail from './ContentDetail'
    import apps from '../data/applications'
    import movies from '../data/movies'
    import sports from '../data/sports'
    import * as httpModule from 'http'

    export default {
        name: 'home',
        extends: AbstractScreen,
        data() {
            return {
                apps: [],
                movies: [],
                sports: []
            }
        },
        components: {
            Menu
        },
        methods: {
            /**
             * set active screen name value to store
             */
            setDefaultFocus() {
                this.$store.commit('SET_SCREEN', this.$options.name);
                this.$refs.navigation.nativeView.focus();
            },
            /**
             * page onload event
             * hide action bar when page is loaded
             * set IS_NAVIGATING to false when page is loaded
             * @param {Object} event
             */
            onLoaded(event) {
                console.info('ON LOAD FINISHED - Home');
                const page = event.object;
                page.actionBarHidden = true;

                this.setDefaultFocus();
                this.$store.commit('SET_IS_NAVIGATING', false);
            },
            /**
             * page on navigated to event
             * if page is first opened then set default focus
             * if page is loaded from hardware back key press do nothing
             * @param {Object} event
             */
            onNavigatedTo(event) {
                if (!event.isBackNavigation) {
                    this.fetchItems();
                }
            },
            /**
             * for android, save loaded item into jsview to handle focus inside Activity class
             * @param {Object} event
             */
            loaded(event) {
                if (this.$isAndroid) {
                    let view = event.object;
                    view.android['jsview'] = event.object;
                }
            },
            /**
             * listen for video finish event
             */
            onVideoFinish(event) {
                console.log('onVideoFinish');
            },
            /**
             * fetch fake (static) items from a helper class
             */
            fetchItems() {
                this.apps = apps;
                this.movies = movies;
                this.sports = sports;
            },
            /**
             * handle application click event
             * @param {Object} event
             */
            loadApplication(event) {
                console.log(event);
            },
            /**
             * handle movie click event
             * @param {Object} event
             */
            loadMovie(event) {
                const id = event.object.id;
                if (id) {
                    const content = this.findMovie(id);
                    if (content) {
                        this.$navigateTo(ContentDetail, {
                            props: {
                                content
                            }
                        });
                    }
                }
            },
            /**
             * find a movie by id inside fake movie list
             * @param {Number} movieId
             */
            findMovie(movieId) {
                if (this.movies.length > 0) {
                    return this.movies.find((movie) => {
                        return movie.id == movieId;
                    });
                }
                return {};
            }
        }
    }
</script>

<style scoped>
    StackLayout {
        overflow: visible;
    }
    .appIcon {
        padding: 5;
        background-size: cover;
        background-repeat: no-repeat;
        transform: scale(0.8);
    }

    .appIcon:focused {
        animation-name: scale;
        animation-duration: 2;
        animation-fill-mode: forwards;
    }

    @keyframes scale {
        from { transform: scale(0.8); }
        to { transform: scale(1.0,1.0) }
    }

    .appTitle, .appDescription {
        visibility: collapsed;
    }

    .appIcon:focused + .appTitle,
    .appIcon:focused + .appDescription {
        visibility: visible;
    }
</style>
