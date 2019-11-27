<template>
    <StackLayout>
        <GridLayout columns="*" rows="3*, 5*">
            <GridLayout columns="*,3*" rows="*" row="0" col="1">
                <Button id="search" class="search" @tap="loadMenu" @loaded="loaded" row="0" col="1"></Button>
            </GridLayout>
            <GridLayout columns="*,3*" rows="*" row="1" col="0">
                <ScrollView id="menu" class="menu" row="0" col="1">
                    <StackLayout>
                        <Button ref="home" id="home" @tap="loadMenu" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_HOME') }}</Button>
                        <Button ref="live" id="live" @tap="loadMenu" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_LIVE') }}</Button>
                        <Button ref="movie" id="movie" @tap="loadMenu" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_MOVIE') }}</Button>
                        <Button ref="series" id="series" @tap="loadMenu" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_SERIES') }}</Button>
                        <Button ref="sport" id="sport" @tap="loadMenu" @loaded="loaded">{{ $t('GENERIC_TEXT_VALUE_SPORT') }}</Button>
                    </StackLayout>
                </ScrollView>
            </GridLayout>
        </GridLayout>
    </StackLayout>
</template>

<script type="text/babel">
    export default {
        name: 'menu',
        methods: {
            /**
             * navigate to corresponding menu screen for a menu item on menu item click
             * @param {Object} event
             */
            loadMenu(event) {
                this.$root.$emit('navigate', event.object.id);
            },
            /**
             * for android, save loaded item into jsview to handle focus inside Activity class
             * @param {Object} event
             */
            loaded(event) {
                if (this.$isAndroid) {                    
                    let view = event.object;
                    view.android['jsview'] = event.object;
                    view.android['clickVisibility'] = true;
                }
            }
        }
    }
</script>

<style scoped>
    StackLayout {
        background-color: #020D27;
    }
    .search {
        horizontal-align: left;
        vertical-align: center;
        background-image: url('res://ic_shortcut_search');
        background-repeat: no-repeat;
    }

    .search:focused {
        background-image: url('res://ic_shortcut_search_focused');
    }

    .menu Button {
        font-family: 'RobotoCondensed-Regular';
        font-size: 20;
        text-transform: none;
        text-align: left;
        color: #EEEEEE;
        background-color: #020D27;
        border : 0 solid black;
    }
</style>