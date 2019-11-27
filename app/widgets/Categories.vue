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
            /**
             * parse current category name and index from categoryId
             * @param {String} categoryId
             * @returns {Object} 
             */
            getCategoryPartsFromId(categoryId) {
                const lastIndex = categoryId.lastIndexOf('_');
                const currentCategoryName = categoryId.substr(0, lastIndex);
                const currentIndex = parseInt(categoryId.substr(lastIndex + 1));
                return {
                    currentCategoryName,
                    currentIndex
                }
            },
            /**
             * create a category id dynamically for a content using it's name and index
             * @param {Object} category
             * @param {Number} index
             * @returns {String}
             */
            createCategoryId(category, index) {
                return `${category.classificationTermName}_${index}`;
            },
            /**
             * navigate to search screen when search button is clicked
             * @param {Object} event
             */
            loadSearch(event) {
                this.$root.$emit('navigate', event.object.id);
            },
            /**
             * navigate to content list screen for a category on category click
             * @param {Object} event
             */
            loadCategory(event) {
                const categoryId = event.object.id;
                const category = this.getCategoryPartsFromId(categoryId);
                this.$root.$emit('loadCategory', category.currentCategoryName);
            },
            /**
             * for android, save loaded item into jsview to handle focus inside Activity class
             * @param {Object} event
             */
            loaded(event) {
                let view = event.object;
                if (this.$isAndroid) {
                    view.android['jsview'] = event.object;
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
        background-color: #020D27;
        border : 0 solid black;
    }
</style>