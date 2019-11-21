<template>
    <StackLayout col="0">
        <GridLayout columns="*" rows="3*, 5*">
            <GridLayout columns="*,3*" rows="*" row="0" col="1">
                <Button id="search" class="search" @tap="loadSearch" @loaded="loaded" row="0" col="1"></Button>
            </GridLayout>
            <GridLayout columns="*,3*" rows="*" row="1" col="0">
                <ScrollView id="menu" class="categoryMenu" row="0" col="1">
                    <StackLayout>
                        <Button :id="createCategoryId(category, index)" v-for="(category, index) in categories" textWrap="true" @tap="loadCategory" @loaded="loaded">{{ category.classificationName }}</Button>
                    </StackLayout>
                </ScrollView>
            </GridLayout>
            <ActivityIndicator v-if="isProcessing" colSpan="4" rowSpan="8" col="0" row="0" verticalAlignment="center" horizontalAlignment="center" busy="true"></ActivityIndicator>
        </GridLayout>
    </StackLayout>
</template>

<script type="text/babel">
    export default {
        name: 'categories',
        props: {
            categories: {
                type: Array,
                default: () => []
            },
            isProcessing: {
                type: Boolean,
                default: () => false
            }
        },
        methods: {
            getCategoryPartsFromId(categoryId) {
                const lastIndex = categoryId.lastIndexOf('_');
                const currentCategoryName = categoryId.substr(0, lastIndex);
                const currentIndex = parseInt(categoryId.substr(lastIndex + 1));
                return {
                    currentCategoryName,
                    currentIndex
                }
            },
            createCategoryId(category, index) {
                return `${category.classificationTermName}_${index}`;
            },
            loadSearch(event) {
                this.$root.$emit('navigate', event.object.id);
            },
            loadCategory(event) {
                const categoryId = event.object.id;
                const category = this.getCategoryPartsFromId(categoryId);
                console.log(`dispatch-loadCategory-${category.currentCategoryName}`);
                this.$root.$emit('loadCategory', category.currentCategoryName);
            },
            loaded(event) {
                let view = event.object;
                if (this.$isAndroid) {
                    view.android['jsview'] = event.object;
                }

                const categoryId = view.id;
                if (categoryId !== 'search') {
                    const category = this.getCategoryPartsFromId(categoryId);
                    if (category.currentIndex === 0) {
                        // fire to load category contents
                        console.log(`dispatch-loadCategory-${category.currentCategoryName}`);
                        this.$root.$emit('loadCategory', category.currentCategoryName);

                        view.addPseudoClass('focused');
                        if (this.$isAndroid) {
                            view.android.setFocusable(true);
                            view.android.setFocusableInTouchMode(true);
                            view.android.requestFocus();
                        }
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

    .categoryMenu Button {
        font-family: 'RobotoCondensed-Regular';
        font-size: 20;
        text-transform: none;
        text-align: left;
        color: #EEEEEE;
        background-color: transparent;
        border-color: transparent;
        border-width: 1px;
    }

    .categoryMenu Button:focused {
        color: #950B02;
    }
</style>