<template>
    <StackLayout>
        <GridLayout columns="*" rows="3*, 5*">
            <GridLayout columns="*,3*" rows="*" row="0" col="1">
                <Button id="search" class="search" @tap="loadMenu" @loaded="loaded" row="0" col="1"></Button>
            </GridLayout>
            <GridLayout columns="*,3*" rows="*" row="1" col="0">
                <ScrollView id="menu" class="menu" row="0" col="1">
                    <StackLayout>
                        <Button ref="home" id="home" @tap="loadMenu" @loaded="loaded" :class="isFocused('home')">{{ $t('GENERIC_TEXT_VALUE_HOME') }}</Button>
                        <Button ref="live" id="live" @tap="loadMenu" @loaded="loaded" :class="isFocused('live')">{{ $t('GENERIC_TEXT_VALUE_LIVE') }}</Button>
                        <Button ref="movie" id="movie" @tap="loadMenu" @loaded="loaded" :class="isFocused('movie')">{{ $t('GENERIC_TEXT_VALUE_MOVIE') }}</Button>
                        <Button ref="series" id="series" @tap="loadMenu" @loaded="loaded" :class="isFocused('series')">{{ $t('GENERIC_TEXT_VALUE_SERIES') }}</Button>
                        <Button ref="sport" id="sport" @tap="loadMenu" @loaded="loaded" :class="isFocused('sport')">{{ $t('GENERIC_TEXT_VALUE_SPORT') }}</Button>
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
            loadMenu(event) {
                this.$root.$emit('navigate', event.object.id);
            },
            loaded(event) {
                if (this.$isAndroid) {
                    let view = event.object;
                    view.android['jsview'] = event.object;
                    view.android['clickVisibility'] = true;
                }
            },
            isFocused(id) {
                const screen = this.$store.getters.activeScreen;
                const isNavigating = this.$store.getters.isNavigating;
                if (screen && id && id.toLowerCase() === screen.toLowerCase() && this.$refs[id] && !isNavigating) {
                    const view = this.$refs[id].nativeView;
                    view.addPseudoClass('focused');
                    if (this.$isAndroid) {
                        view.android.setFocusable(true);
                        view.android.setFocusableInTouchMode(true);
                        view.android.requestFocus();
                        view.android.nextFocusRight = `${id}_list`
                    }
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
        background-color: transparent;
        border-color: transparent;
        border-width: 1px;
    }

    .menu Button:focused {
        color: #950B02;
    }
</style>