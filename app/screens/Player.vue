<template>
    <Page @loaded="onLoaded">
        <GridLayout rows="*" columns="*">
            <ExoPlayer ref="videoPlayer" id="nativeexoplayer" controls="true" loop="false" autoplay="true"
                       height="100%" width="100%" fill="true" :src="playUrl" backgroundColor="#020D27"
                       @playbackError="onPlaybackError"></ExoPlayer>
        </GridLayout>
    </Page>
</template>

<script type="text/babel">
    import AbstractScreen from './AbstractScreen'
    import * as application from 'tns-core-modules/application'
    import * as dialogs from 'tns-core-modules/ui/dialogs'

    export default {
        name: 'player',
        extends: AbstractScreen,
        props: {
            url: {
                type: String,
                default: () => ''
            },
            ticket: {
                type: String,
                default: () => ''
            },
            token: {
                type: String,
                default: () => ''
            }
        },
        computed: {
            /**
             * compute and return play url of a content
             * @returns {Object}
             */
            playUrl() {
                return {
                    typeSource: 5,
                    url: this.url,
                    ticket: this.ticket,
                    proxyUrl: this.url,
                    token: this.token
                }
            }
        },
        methods: {
            /**
             * page onload event
             * hide action bar when page is loaded
             * set IS_NAVIGATING to false when page is loaded
             * @param {Object} event
             */
            onLoaded(event) {
                console.info('ON LOAD FINISHED - Video');
                const page = event.object;
                page.actionBarHidden = true;
            },
            /**
             * on video playback error
             */
            onPlaybackError() {
                dialogs.alert('Playback Error');
            }
        }
    }
</script>

<style scoped>
</style>



