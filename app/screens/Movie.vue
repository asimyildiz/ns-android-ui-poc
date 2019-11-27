<template>
    <Page @loaded="onLoaded" @navigatedTo="onNavigatedTo">
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
            /**
             * compute and return category list from store
             * @returns {Array}
             */
            categories() {
                const categories = this.$store.getters.categories;
                if (categories) {
                    return categories.defaultCategories;
                }
                return [];
            },
            /**
             * compute and return if categories are still loading from service
             * @returns {Boolean}
             */
            isCategoryLoading() {
                return this.$store.getters.isCategoryLoading;
            },
            /**
             * compute and return content list from store
             * @returns {Array}
             */
            contents() {
                const contents = this.$store.getters.contents;
                if (contents) {
                    return contents;
                }
                return [];
            },
            /**
             * compute and return if contents are still loading from service
             * @returns {Boolean}
             */
            isContentsLoading() {
                return this.$store.getters.isContentsLoading;
            },
            /**
             * compute and return active category id
             * @returns {Number}
             */
            currentCategoryId() {
                return this.$store.getters.categoryId;
            }
        },
        methods: {
            /*******************************************************************************************************
            ******************************** ASSET RELATED METHODS *************************************************
            ********************************************************************************************************/
           /**
            * get trailer url for a content
            * @param {Object} currentContent
            * @param {Object} contentDetailResult
            * @returns {Promise<*>}
            */
            getTrailerUrl(currentContent, contentDetailResult) {
                const assetId = contentDetailResult.previewsSourceUrlList && contentDetailResult.previewsSourceUrlList[0];
                if (assetId) {
                    return beINFW.vodService.playPreview(currentContent.cmsContentID, assetId);
                }
                return Promise.resolve(null);
            },
            /**
             * parse and get content id from a string
             * @param {String} id
             * @returns {String}
             */
            getContentId(id) {
                return id.substr(0, id.lastIndexOf('_'));
            },
            /**
             * find a content from contents
             * @param {String} contentId
             * @returns {Object}
             */
            findContent(contentId) {
                if (this.contents.length > 0) {
                    return this.contents.find((content) => {
                        return content.cmsContentID == contentId;
                    });
                }
                return {};
            },
            /**
             * get trailer url for a content by id
             * @param {String} id
             * @returns {Promise<*>}
             */
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
            /**
             * register to listen events such as 
             * loadCategory - event when a category contents are loaded
             * contentFocusChange - event when a new content is selected by dpad
             * movieLoad - event when a movie is loaded
             */
            listenEvents() {
                this.$root.$on('loadCategory', this.loadCategory.bind(this));
                this.$root.$on('onContentFocusChange', this.onContentFocusChange.bind(this));
                this.$root.$on('onMovieLoad', this.onMovieLoad.bind(this))
            },
            /**
             * set active screen name value to store
             */
            setDefaultFocus() {
                this.$store.commit('SET_SCREEN', this.$options.name);
            },
            /**
             * set access keys for service from config
             */
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
            /**
             * fetch categories from store if categories are previously loaded to store
             * if not fetch categories from service
             * remove some categories which has no content inside
             * @returns {Promise<*>}
             */
            fetchData() {
                const categories = this.$store.getters.categories;
                if (!categories) {
                    this.$store.commit('SET_CATEGORY_IS_LOADING', true);
                    return beINFW.vodService.getClassificationTree(true)
                            .then((categories) => {
                                // we need to have at least a category 
                                if (categories && categories.defaultCategories) {
                                    // because category tree structure is updated on services
                                    // just remove the parent categories which has no content inside manually
                                    categories.defaultCategories = categories.defaultCategories.filter((category) => {
                                        return ["FILM", "BOX_OFFICE", "SPOR", "COCUK", "YERLI_DIZI"].indexOf(category.classificationTermName) == -1;
                                    });                                                
                                    this.$store.commit('SET_CATEGORIES', categories);
                                    this.loadCategory(categories.defaultCategories[0].classificationTermName);
                                }                                
                            });
                }else {
                    this.loadCategory(categories.defaultCategories[0].classificationTermName);
                }
                return Promise.resolve();
            },
            /**
             * fetch contents for a category
             * @param {String} categoryId
             * @returns {Promise<*>}
             */
            loadCategory(categoryId) {
                this.$store.commit('SET_CONTENTS_ARE_LOADING', true);
                beINFW.vodService.getContentsInClassification(categoryId, 0, 50, 'DESC')
                        .then((result) => {
                            this.$store.commit('SET_TOTAL_NUMBER_OF_CONTENS', result.item1);
                            this.$store.commit('SET_CONTENTS', { categoryId: categoryId, contents: result.item2});
                        });
                return Promise.resolve([]);
            },
            /**
             * fetch trailer url for a content when focus is changed using dpad and set playUrl
             * @param {String} contentId
             */
            onContentFocusChange(contentId) {
                this.getTrailerUrlContent(contentId)
                        .then((url) => {
                            if (url && url.cdnUri) {
                                this.playUrl = url.cdnUri;
                            }
                        });
            },
            /**
             * navigate to content detail page when a content is clicked
             * @param {String} contentId
             */
            onMovieLoad(contentId) {
                const content = this.findContent(this.getContentId(contentId));
                this.$root.$emit('navigate', 'details', {
                    contentId,
                    content
                });
            },
            /**
             * page onload event
             * hide action bar when page is loaded
             * set IS_NAVIGATING to false when page is loaded
             * @param {Object} event
             */
            onLoaded(event) {
                console.info('ON LOAD FINISHED - Movie');
                const page = event.object;
                page.actionBarHidden = true;
            },
            /**
             * page on navigated to event
             * if page is first opened then set default focus and fetch data
             * if page is loaded from hardware back key press do nothing
             * @param {Object} event
             */
            onNavigatedTo(event) {
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
