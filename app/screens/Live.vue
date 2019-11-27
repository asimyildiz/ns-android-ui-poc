<template>
    <Page @loaded="onLoaded" @navigatedTo="onNavigatedTo">
        <!-- Screen elements that need to be within the overscan safe area go here -->
        <GridLayout rows="*" columns="2*, 5*">
            <Menu ref="navigation" id="navigation" col="0"/>
        </GridLayout>
    </Page>
</template>

<script type="text/babel">
    import AbstractScreen from './AbstractScreen'
    import Menu from '../widgets/Menu'
    export default {
        name: 'live',
        extends: AbstractScreen,
        components: {
            Menu
        },
        methods: {
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
                console.info('ON LOAD FINISHED - Live');
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
            }
        }
    }
</script>

<style scoped>

</style>
