<template>
    <Page @loaded="onLoaded">
        <!-- Screen elements that need to be within the overscan safe area go here -->
        <GridLayout rows="*" columns="2*, 5*">
            <Categories col="0" ref="categoryMenu" id="categoryMenu" :categories="categories" :isProcessing="isCategoryLoading" />
            <Contents col="1" ref="contentList" id="contentList" :currentCategoryId="currentCategoryId" :contents="contents" :isProcessing="isContentsLoading" :playUrl="playUrl" />
        </GridLayout>
    </Page>
</template>

<script type="text/babel">
    import AbstractScreen from './AbstractScreen'
    import Categories from '../widgets/Categories'
    import Contents from '../widgets/Contents'
    import * as timerModule from 'tns-core-modules/timer'

    export default {
        name: 'movie',
        extends: AbstractScreen,
        components: {
            Categories,
            Contents
        },
        data() {
            return {
                playUrl: '',
                cdnUri: '',
                ticket: '',
                codec: ''
            }
        },
        computed: {
            categories() {
                const categories = this.$store.getters.categories;
                if (categories) {
                    return categories.defaultCategories;
                }
                return [];
            },
            isCategoryLoading() {
                return this.$store.getters.isCategoryLoading;
            },
            contents() {
                const contents = this.$store.getters.contents;
                if (contents) {
                    return contents;
                }
                return [];
            },
            isContentsLoading() {
                return this.$store.getters.isContentsLoading;
            },
            currentCategoryId() {
                return this.$store.getters.categoryId;
            }
        },
        methods: {
            /*******************************************************************************************************
            ******************************** ASSET RELATED METHODS *************************************************
            ********************************************************************************************************/
            getTrailerUrl(currentContent, contentDetailResult) {
                const assetId = contentDetailResult.previewsSourceUrlList && contentDetailResult.previewsSourceUrlList[0];
                if (assetId) {
                    return beINFW.vodService.playPreview(currentContent.cmsContentID, assetId);
                }
                return Promise.resolve(null);
            },
            getContentId(id) {
                return id.substr(0, id.lastIndexOf('_'));
            },
            findContent(contentId) {
                if (this.contents.length > 0) {
                    return this.contents.find((content) => {
                        return content.cmsContentID == contentId;
                    });
                }
                return {};
            },
            getTrailerUrlContent(id) {
                const currentContent = this.findContent(this.getContentId(id));
                if (currentContent) {
                    return beINFW.vodService.getContentDetail(currentContent.cmsContentID)
                            .then((result) => {
                                currentContent.contentDetail = result;
                                return this.getTrailerUrl(currentContent, result);
                            });
                }
                return Promise.resolve(null);
            },
            /*******************************************************************************************************
             *********************************** SCREEN METHODS ****************************************************
             ********************************************************************************************************/
            listenEvents() {
                this.$root.$on('loadCategory', this.loadCategory.bind(this));
                this.$root.$on('onContentFocusChange', this.onContentFocusChange.bind(this));
                this.$root.$on('onMovieLoad', this.onMovieLoad.bind(this))
            },
            setDefaultFocus() {
                this.$store.commit('SET_SCREEN', this.$options.name);
            },
            setAccessKeys() {
                // get access keys from elsewhere if there is no
                // or do not set access keys from here, instead add a method to fetch access keys into vodService
                // and return a fake code for DesktopVendor, and get it from STB or elsewhere for another vendor
                if (this.$config.dbsCode && this.$config.portalCode) {
                    beINFW.vodManager.setAccessKeys({
                        applicationId: this.$config.applicationId,
                        clientId: this.$config.clientId,
                        dbsCode: this.$config.dbsCode,
                        portalCode: this.$config.portalCode,
                        partyRoleId: this.$config.partyRoleId,
                        sessionKey: this.$config.sessionKey,
                        serviceAccountId: this.$config.serviceAccountId
                    });
                }
            },
            fetchData() {
                const categories = this.$store.getters.categories;
                if (!categories || categories.length === 0) {
                    this.$store.commit('SET_CATEGORY_IS_LOADING', true);
                    return beINFW.vodService.getClassificationTree(true)
                            .then((categories) => {
                                this.$store.commit('SET_CATEGORIES', categories);
                            });
                }
                return Promise.resolve();
            },
            loadCategory(categoryId) {
                this.$store.commit('SET_CONTENTS_ARE_LOADING', true);
                beINFW.vodService.getContentsInClassification(categoryId, 0, 50, 'DESC')
                        .then((result) => {
                            this.$store.commit('SET_TOTAL_NUMBER_OF_CONTENS', result.item1);
                            this.$store.commit('SET_CONTENTS', { categoryId: categoryId, contents: result.item2});
                        });
                return Promise.resolve([]);
            },
            onContentFocusChange(contentId) {
                this.getTrailerUrlContent(contentId)
                        .then((url) => {
                            if (url && url.cdnUri) {
                                this.playUrl = url.cdnUri;
                            }
                        });
            },
            onMovieLoad(contentId) {
                const content = this.findContent(this.getContentId(contentId));
                this.$root.$emit('navigate', 'details', {
                    contentId,
                    content
                });
            },
            onLoaded(event) {
                console.info('ON LOAD FINISHED - Movie');
                const page = event.object;
                page.actionBarHidden = true;

                if (!event.isBackNavigation) {
                    this.listenEvents();
                    setTimeout(() => {
                        this.setAccessKeys();
                        this.fetchData().then(() => {
                            // we do not need to set screen name here, because there is no menu widget
                            // this.setDefaultFocus();
                            this.$store.commit('SET_IS_NAVIGATING', false);
                        });
                    }, 1000);
                }
            }
        }
    }
</script>

<style scoped>

</style>
