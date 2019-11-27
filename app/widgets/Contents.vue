<template>
    <StackLayout col="1">
        <ActivityIndicator v-if="isProcessing" height="30" verticalAlignment="center" horizontalAlignment="center" busy="true"></ActivityIndicator>
        <RadListView id="movie_list" for="(content, index) in contents" orientation="vertical" layout="grid" itemInsertAnimation="Scale" itemHeight="320" gridSpanCount="4">
            <v-template>
                <StackLayout orientation="vertical" padding="0" height="280">
                    <Button :id="createContentId(content, index)" class="poster" width="240" height="240" :style="{ 'background-image': 'url(\'' + getPoster(content) + '\')' }" @loaded="loaded" @tap="loadMovie"></Button>
                    <TextView class="appTitle" horizontalAlignment="center" verticalAlignment="bottom" height="40">{{content.originalTitleName}}</TextView>
                </StackLayout>
            </v-template>
        </RadListView>
    </StackLayout>
</template>

<script type="text/babel">
    export default {
        name: 'contents',
        props: {
            contents: {
                type: Array,
                default: () => []
            },
            currentCategoryId: {
                type: String,
                default: () => ''
            },
            isProcessing: {
                type: Boolean,
                default: () => false
            },
            playUrl: {
                type: String,
                default: () => ''
            }
        },
        methods: {
            /**
             * get poster of a content
             * @param {Object} content
             * @returns {String}
             */
            getPoster(content) {
                // TODO return a default image if there is no image
                return content.posterList && content.posterList.length > 0 ? content.posterList[0] : "";
            },
            /**
             * create a content id dynamically for a content using it's name and index
             * @param {Object} content
             * @param {Number} index
             * @returns {String}
             */
            createContentId(content, index) {
                return `${content.cmsContentID}_${index}`;
            },
            /**
             * navigate to content detail screen for a content on click
             * @param {Object} event
             */
            loadMovie(event) {
                this.$root.$emit('onMovieLoad', event.object.id);
            },
            /**
             * for android, save loaded item into jsview to handle focus inside Activity class
             * listen active contentfocuschange event
             * @param {Object} event
             */
            loaded(event) {
                if (this.$isAndroid) {
                    const view = event.object;

                    view.android['jsview'] = view;
                    view.android['emitter'] = this.$root.$emit.bind(this.$root, 'onContentFocusChange', view.id);
                }
            }
        }
    }
</script>

<style scoped>
    .poster {
        background-size: cover;
        background-repeat: no-repeat;
        transform: scale(0.8);
    }

    .poster:focused {
        animation-name: scale;
        animation-duration: 2;
        animation-fill-mode: forwards;
    }

    @keyframes scale {
        from { transform: scale(0.8); }
        to { transform: scale(1.0,1.0) }
    }

    .appTitle, .appDescription {
        font-size: 14;
        opacity: 0;
        border-bottom-width: 0;
        background-color: transparent;
        color: #020D27;
    }

    .poster:focused + .appTitle,
    .poster:focused + .appDescription {
        visibility: visible;
        animation-name: opaq;
        animation-duration: 2;
        animation-fill-mode: forwards;
    }

    @keyframes opaq {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>