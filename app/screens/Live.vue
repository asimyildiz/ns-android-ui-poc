<template>
    <Page @loaded="onLoaded">
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
            onLoaded(event) {
                console.info('ON LOAD FINISHED - Live');
                const page = event.object;
                page.actionBarHidden = true;

                if (!event.isBackNavigation) {
                    this.setDefaultFocus();
                }
                this.$store.commit('SET_IS_NAVIGATING', false);
            }
        }
    }
</script>

<style scoped>

</style>
