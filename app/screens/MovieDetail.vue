<template>
    <Page @loaded="onLoaded">
        <AbsoluteLayout top="0" left="0">
            <AbsoluteLayout top="0" left="0" height="300" width="100%" :backgroundColor="getMainBackgroundColor">
                <GridLayout background="transparent" height="300" width="100%">
                    <TextView class="posterText" :text="content.originalTitleName" :color="getMainTextBackgroundColor" horizontalAlignment="center" verticalAlignment="center" editable="false"></TextView>
                </GridLayout>
            </AbsoluteLayout>
            <AbsoluteLayout top="300" left="0" height="40" width="100%" :backgroundColor="getBackgroundColor">
                <AbsoluteLayout top="0" left="250">
                    <GridLayout rows="50" columns="100, *, *">
                        <StackLayout class="buttons" orientation="horizontal" verticalAlignment="center" row="0" col="2">
                            <ActivityIndicator v-show="hasProcessing" height="20" width="20" verticalAlignment="center" horizontalAlignment="center" busy="true"></ActivityIndicator>
                            <Button ref="buy" v-show="isBuyButtonVisible" @tap="buyContent" @loaded="loaded" :color="getTextBackgroundColor" :text="getBuyButtonText"></Button>
                            <Button ref="rent" v-show="isRentButtonVisible" @tap="rentContent" @loaded="loaded" :color="getTextBackgroundColor" :text="getRentButtonText"></Button>
                            <Button ref="watch" v-show="isWatchButtonVisible" @tap="watchContent" @loaded="loaded" :color="getTextBackgroundColor">{{ $t('GENERIC_TEXT_VALUE_WATCH') }}</Button>
                        </StackLayout>
                    </GridLayout>
                </AbsoluteLayout>
            </AbsoluteLayout>
            <AbsoluteLayout top="340" left="0" height="100%" width="100%">
                <AbsoluteLayout top="0" left="360" height="100%" width="500">
                    <StackLayout orientation="vertical" width="500" height="380" top="0" left="0">
                        <TextView :text="localTitle" editable="false" width="400" horizontalAlignment="left" />
                        <TextView :text="programTitleYear" editable="false" width="400" horizontalAlignment="left" />
                        <TextView :text="actors" editable="false" width="400" horizontalAlignment="left" />
                        <TextView :text="summaryMedium" editable="false" width="500" />
                    </StackLayout>
                </AbsoluteLayout>
            </AbsoluteLayout>
            <AbsoluteLayout top="250" left="100" height="250" width="200">
                <Image ref="posterImage" @loaded="posterLoaded" :src="poster" height="250" stretch="aspectFit" />
            </AbsoluteLayout>
        </AbsoluteLayout>
    </Page>
</template>

<script type="text/babel">
    import AbstractScreen from './AbstractScreen'
    import Utils from '../helpers/Utils'
    import * as ImageLibrary from 'nativescript-image-colors'
    import * as httpModule from 'http'
    import * as imageSource from 'tns-core-modules/image-source'
    import * as xmlModule from 'tns-core-modules/xml'
    import * as application from 'tns-core-modules/application'

    export default {
        name: 'movieDetail',
        extends: AbstractScreen,
        data() {
            return {
                backgroundColor: '',
                mainBackgroundColor: '',
                textBackgroundColor: '',
                mainTextBackgroundColor: '',
                buyButtonText: '',
                rentButtonText: '',
                watchButtonText: '',
                contentDetail: null,
                userSpecificContentData: null,
                isProcessing: true
            }
        },
        props: {
            contentId: {
                type: String,
                default: () => ''
            },
            content: {
                type: Object,
                default: () => {}
            }
        },
        watch: {
            content: function(newContent, oldContent) {
                if (newContent && oldContent && newContent.cmsContentID !== oldContent.cmsContentID) {

                }
            }
        },
        computed: {
            poster() {
                return this.content && this.content.posterList && this.content.posterList[0];
            },
            localTitle() {
                if (this.contentDetail && this.contentDetail.localTitleLong) {
                    return this.contentDetail.localTitleLong;
                }
                return this.content.localTitleLong;
            },
            programTitleYear() {
                if (this.contentDetail && this.contentDetail.programTitleYear) {
                    return this.contentDetail.programTitleYear;
                }
                return this.content.programTitleYear;
            },
            actors() {
                if (this.contentDetail && this.contentDetail.actors) {
                    return this.contentDetail.actors;
                }
                return this.content.actors;
            },
            summaryMedium() {
                if (this.contentDetail && this.contentDetail.summaryMedium) {
                    return this.contentDetail.summaryMedium;
                }
                return this.content.summaryMedium;
            },
            getBackgroundColor() {
                return this.backgroundColor;
            },
            getMainBackgroundColor() {
                return this.mainBackgroundColor;
            },
            getTextBackgroundColor() {
                return this.textBackgroundColor;
            },
            getMainTextBackgroundColor() {
                return this.mainTextBackgroundColor;
            },
            getBuyButtonText() {
                return this.buyButtonText;
            },
            isBuyButtonVisible() {
                return this.buyButtonText !== '';
            },
            getRentButtonText() {
                return this.rentButtonText;
            },
            isRentButtonVisible() {
                return this.rentButtonText !== '';
            },
            getWatchButtonText() {
                return this.watchButtonText;
            },
            isWatchButtonVisible() {
                return this.buyButtonText === '' && this.rentButtonText === '' && !this.isProcessing;
            },
            hasProcessing() {
                return this.isProcessing;
            }
        },
        methods: {
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
            getAssetId(entitlement) {
                let asset;
                if (entitlement && entitlement.assetTypes) {
                    for (var j = 0; j < entitlement.assetTypes.length; j++) {
                        var assetType = entitlement.assetTypes[j];
                        if (assetType && (assetType.type === 'DUB' || assetType.type === 'ORG')) {
                            asset = assetType;
                            break;
                        }
                    }
                }
                return asset && asset.assetId;
            },
            getPlayableUrl(contentDetailResult, userSpecificDataResult) {
                const entitlementList = userSpecificDataResult.entitlementList;
                if (entitlementList && entitlementList.length === 1) {
                    const entitlement = entitlementList[0];
                    if (entitlement && entitlement.entitledToVersion && entitlement.assetTypes) {
                        for (let index = 0; index < entitlement.assetTypes.length; index++) {
                            const assetId = this.getAssetId(entitlement);
                            if (assetId) {
                                const versionType = entitlement.versionType || "";
                                const usageSpecId = entitlement.usageSpecIdForPlay;
                                return beINFW.vodService.play(this.content.cmsContentID, usageSpecId, assetId, 'SS');
                            }
                        }
                    }
                }
                return Promise.resolve(null);
            },
            createWatchButtons(userSpecificDataResult) {
                const entitlementList = userSpecificDataResult.entitlementList;
                const isAdvantage = userSpecificDataResult.isAdvantage;
                if (entitlementList && entitlementList.length === 1) {
                    const entitlement = entitlementList[0];
                    if (entitlement && entitlement.assetTypes && entitlement.assetTypes.length > 0 && entitlement.offerList && entitlement.offerList.offers) {
                        for (let index = 0; index < entitlement.offerList.offers.length; index++) {
                            const offer = entitlement.offerList.offers[index];
                            if (!isAdvantage) {
                                const menuTitle = offer.getMenuItemTitle();
                                if (offer.isForRent()) {
                                    this.rentButtonText = menuTitle;
                                }else if (offer.isForSale()) {
                                    this.buyButtonText = menuTitle;
                                }
                            }
                        }
                    }
                }
            },
            getPlayUrl(result, isTrailer) {
                if (result) {
                    this.cdnUri = result.cdnUri;
                    this.ticket = result.ticket;
                    this.codec = result.codec;
                    this.once = false;
                    const url = `${this.cdnUri}&${this.ticket}`;

                    if (!isTrailer) {
                        return httpModule.request({
                            url: url,
                            method: 'GET',
                            headers: {
                                'Accept': 'asx',
                                'Content-Type': 'video/x-ms-asf',
                                'User-Agent': 'Mozilla/5.0 (Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.112 Safari/537.36 OPR/36.0.2128.0 OMI/4.8.0, Model/Sagemcom-Digiturk-ESIW384 (DT61440UHD; portalV3)'
                            }
                        }).then((response) => {
                            const asxContent = response.content.toString();
                            const onEventCallback = (event) => {
                                switch (event.eventType) {
                                    case xmlModule.ParserEventType.StartElement:
                                        if (event.elementName == 'ref' && event.attributes) {
                                            for (const attributeName in event.attributes) {
                                                if (attributeName == 'href' && !this.once) {
                                                    this.once = true;
                                                    this.startVideoPlaying(event.attributes[attributeName]);
                                                }
                                            }
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            };

                            const onErrorCallback = (error) => {
                                console.log(`Error: ${error.message}`);
                            };

                            const xmlParser = new xmlModule.XmlParser(onEventCallback.bind(this), onErrorCallback);
                            xmlParser.parse(asxContent);
                        }, (e) => {});
                    }
                    return Promise.resolve(url);
                }
            },
            startVideoPlaying(url) {
                if (url && this.cdnUri !== '' && this.ticket !== '') {
                    console.log(`start video playing for ${url}`);
                    const ai = Utils.getParameterByName('ai', this.cdnUri);
                    let playUrl = url + "&ticket=" + this.ticket;
                    if (ai) {
                        playUrl += "&ai=" + ai;
                    }

                    this.$root.$emit('navigate', 'player', {
                        url: playUrl,
                        ticket: `ticket=${this.ticket}`,
                        token: this.$config.sessionKey
                    });

                    /**
                    let activityClass = java.lang.Class.forName('com.stbtv.digiturkplayer.PlayerActivity');
                    let intent = new android.content.Intent(
                            application.android.foregroundActivity,
                            activityClass
                    );
                    intent.putExtra('contentUrl', url);
                    intent.putExtra('proxyUrl', this.cdnUri);
                    intent.putExtra('ticket', this.ticket);
                    intent.putExtra('token', this.$config.sessionKey);

                    application.android.foregroundActivity.startActivity(intent);
                     **/
                }


                /**this.$root.$emit('navigate', 'series', {
                    url,
                    cdnUri: this.cdnUri,
                    ticket: this.ticket,
                    codec: this.codec
                });**/
            },
            getPlayUrlContent() {
                if (this.content) {
                    this.isProcessing = true;
                    return Promise.all([beINFW.vodService.getContentDetail(this.content.cmsContentID), beINFW.vodService.getUserSpecificContentData(this.content.cmsContentID, '' + this.currentCategoryId)])
                            .then((result) => {
                                this.contentDetail = result[0];
                                this.userSpecificContentData = result[1];
                                this.createWatchButtons(result[1]);
                                this.isProcessing = false;

                                let focusedButton = this.$refs.watch.nativeView;
                                if (this.buyButtonText !== '') {
                                    focusedButton = this.$refs.buy.nativeView;
                                }

                                setTimeout(() => {
                                    focusedButton.addPseudoClass('focused');
                                    if (this.$isAndroid) {
                                        focusedButton.android.setFocusable(true);
                                        focusedButton.android.setFocusableInTouchMode(true);
                                        focusedButton.android.requestFocus();
                                    }
                                }, 300);
                            });
                }
                return Promise.resolve(null);
            },
            posterLoaded(event) {
                const poster = event.object;
                if (poster && poster.src) {
                    setTimeout(() => {
                        if (this.$isAndroid) {
                            poster.android.setDrawingCacheEnabled(true);
                        }
                        const colors = ImageLibrary.ImageColors.getColorPalette(poster);
                        this.backgroundColor = colors.color1.hex;
                        this.mainTextBackgroundColor = colors.textColor1.hex;
                        this.mainBackgroundColor = colors.color2.hex;
                        this.textBackgroundColor = colors.textColor2.hex;
                    }, 1000);
                }
            },
            setDefaultFocus() {
                this.$store.commit('SET_SCREEN', this.$options.name);
            },
            onLoaded(event) {
                console.info('ON LOAD FINISHED - ContentDetail');
                const page = event.object;
                page.actionBarHidden = true;

                if (!event.isBackNavigation) {
                    this.setDefaultFocus();
                    this.getPlayUrlContent();
                }
                this.$store.commit('SET_IS_NAVIGATING', false);
            },
            loaded(event) {
                if (this.$isAndroid) {
                    let view = event.object;
                    view.android['jsview'] = event.object;
                }
            },
            buyContent(event) {
                console.log("buy");
            },
            rentContent(event) {
                console.log("rent");
            },
            watchContent(event) {
                if (this.contentDetail && this.userSpecificContentData) {
                    return this.getPlayableUrl(this.contentDetail, this.userSpecificContentData)
                        .then((result) => {
                            return this.getPlayUrl(result, false);
                        });
                }
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
        background-color: transparent;
        border-color: transparent;
        border-width: 1px;
        width: 220px;
        height: 100px;
    }

    Button:focused {
        color: #950B02;
    }

    TextView {
        border-bottom-width: 0;
        background-color: transparent;
        color: #404552;
    }

    TextView.posterText {
        font-family: 'Augustus-Beveled';
        font-size: 50;
    }

    StackLayout.buttons {
        margin-top: 0;
    }
</style>
