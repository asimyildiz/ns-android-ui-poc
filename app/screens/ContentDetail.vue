<template>
    <Page @loaded="onLoaded" @navigatedTo="onNavigatedTo">
        <AbsoluteLayout top="0" left="0">
            <AbsoluteLayout top="0" left="0" height="300" width="100%">
                <Image :src="content.poster_big" stretch="aspectFit" />
            </AbsoluteLayout>
            <AbsoluteLayout top="300" left="0" height="40" width="100%" :backgroundColor="content.backgroundColor">
                <AbsoluteLayout top="0" left="250">
                    <GridLayout rows="50" columns="100, *, *">
                        <StackLayout class="buttons" orientation="horizontal" verticalAlignment="center" row="0" col="2">
                            <Button ref="contentDetail" id="buy" @tap="buyContent" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_BUY') }}</Button>
                            <Button ref="rent" id="rent" @tap="rentContent" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_RENT') }}</Button>
                            <Button ref="watch" id="watch" @tap="watchContent" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_WATCH') }}</Button>
                        </StackLayout>
                    </GridLayout>
                </AbsoluteLayout>
            </AbsoluteLayout>
            <AbsoluteLayout top="340" left="0" height="100%" width="100%" :backgroundColor="content.textBackgroundColor">
                <AbsoluteLayout top="0" left="360" height="100%" width="400">
                    <StackLayout orientation="vertical" width="400" height="240">
                        <TextView :text="content.name" editable="false" width="400" />
                        <TextView :text="content.year" editable="false" width="400" />
                        <TextView :text="actors" editable="false" width="400" />
                        <TextView :text="content.description" editable="false" width="400" />
                    </StackLayout>
                </AbsoluteLayout>
            </AbsoluteLayout>
            <AbsoluteLayout top="250" left="100" height="250" width="200">
                <Image :src="content.poster" height="250" stretch="aspectFit" />
            </AbsoluteLayout>
        </AbsoluteLayout>
    </Page>
</template>

<script type="text/babel">
    import AbstractScreen from './AbstractScreen'

    export default {
        name: 'contentDetail',
        extends: AbstractScreen,
        props: {
            content: {
                type: Object,
                default: () => {}
            }
        },
        computed: {
            /**
             * return actors as string separated by comma
             */
            actors() {
                return this.content && this.content.actors.join(', ');
            }
        },
        methods: {
            /**
             * set active screen name value to store
             */
            setDefaultFocus() {
                this.$store.commit('SET_SCREEN', this.$options.name);
            },
            /**
             * page onload event
             * hide action bar when page is loaded
             * set IS_NAVIGATING to false when page is loaded
             * @param {Object} event
             */
            onLoaded(event) {
                console.info('ON LOAD FINISHED - ContentDetail');
                const page = event.object;
                page.actionBarHidden = true;

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
                    this.setDefaultFocus();
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
             * handle buy content button click
             * @param {Object} event
             */
            buyContent(event) {
                console.log("buy");
            },
            /**
             * handle rent content button click
             * @param {Object} event
             */
            rentContent(event) {
                console.log("rent");
            },
            /**
             * handle watch content button click
             * @param {Object} event
             */
            watchContent(event) {
                console.log("watch");
            }
        }
    }
</script>

<style scoped>
    Button {
        font-family: 'RobotoCondensed-Regular';
        font-size: 20;
        text-transform: none;
        text-align: left;
        color: #EEEEEE;
        background-color: transparent;
        border-color: transparent;
        border-width: 1px;
        width: 220px;
        height: 100px;
    }

    TextView {
        border-bottom-width: 0;
        background-color: transparent;
        color: #EEEEEE;
    }

    StackLayout.buttons {
        margin-top: 0;
    }
</style>
