import AbstractNativeObjectModel from '../AbstractNativeObjectModel';
import VodFollowMe from './VodFollowMe';

/**
 * class for vod content model
 * @model VodContent
 */
class VodContent extends AbstractNativeObjectModel {
    /** ***************************************************************************************
     * STATIC DEFINITIONS
     **************************************************************************************** */
    /**
     * @type {Array<String>}
     */
    static get PROPERTIES() {
        return super.PROPERTIES.concat([
            'episodeNo',
            'seasonNo',
            'nextEpisodeProductID',
            'duration',
            'countryOfOrigin',
            'actors',
            'directorFullName',
            'summaryMedium',
            'productionCompaniesName',
            'previewsSourceUrlList',
            'cmsContentID',
            'seasonCmsContentID',
            'titleCmsContentID',
            'followMeInfo',
            'isChargeable',
            'isSellable',
            'eventType',
            'originalTitleName',
            'assetIDList',
            'usageSpecIDList',
            'localTitleLong',
            'genreList',
            'posterList',
            'programTitleYear',
            'isPvrRequired',
            'endTime',
            'ageRangeStartValue',
            'parentalControl',
            'orderField',
            'orderMode',
            'idavAssetID',
            'isSeriesWatchedContent']);
    }

    /**
     * @param {Object} data
     * @constructor
     */
    constructor(data) {
        super(data);

        if (data) {
            this.episodeNo = data.EpisodeNo;
            this.seasonNo = data.SeasonNo;
            this.nextEpisodeProductID = data.NextEpisodeProductID;
            this.duration = data.Duration;
            this.countryOfOrigin = data.CountryOfOrigin;
            this.actors = data.Actors;
            this.directorFullName = data.DirectorFullName;
            this.summaryMedium = data.SummaryMedium;
            this.productionCompaniesName = data.ProductionCompaniesName;
            this.userActionCount = data.UserActionCount;

            if (data.PreviewsSourceUrlList) {
                this.previewsSourceUrlList = [];
                for (let i = 0; i < data.PreviewsSourceUrlList.length; i++) {
                    const preview = data.PreviewsSourceUrlList[i];
                    this.previewsSourceUrlList.push(preview);
                }
            }

            this.cmsContentID = data.CMSContentID;
            this.seasonCmsContentID = data.SeasonCMSContentID;
            this.titleCmsContentID = data.TitleCMSContentID;
            this.isSeriesWatchedContent = data.SeasonCMSContentID && data.TitleCMSContentID;

            if (data.FollowMeInfo) {
                this.followMeInfo = new VodFollowMe(data.FollowMeInfo);
            }

            this.isChargeable = data.IsChargeable || false;
            this.isSellable = data.IsSellable || false;
            this.eventType = data.EventType;
            this.originalTitleName = data.OriginalTitleName;

            if (data.AssetIDList) {
                this.assetIDList = [];
                for (let i = 0; i < data.AssetIDList.length; i++) {
                    const assetID = data.AssetIDList[i];
                    this.assetIDList.push(assetID);
                }
            }

            if (data.UsageSpecIDList) {
                this.usageSpecIDList = [];
                for (let i = 0; i < data.UsageSpecIDList.length; i++) {
                    const usageSpecID = data.UsageSpecIDList[i];
                    this.usageSpecIDList.push(usageSpecID);
                }
            }

            this.localTitleLong = data.LocalTitleLong;

            if (data.GenreList) {
                this.genreList = [];
                for (let i = 0; i < data.GenreList.length; i++) {
                    const genre = data.GenreList[i];
                    this.genreList.push(genre);
                }
            }

            if (data.PosterList) {
                this.posterList = [];
                for (let i = 0; i < data.PosterList.length; i++) {
                    const poster = data.PosterList[i];
                    this.posterList.push(poster);
                }
            }

            this.programTitleYear = data.ProgramTitleYear;
            this.isPvrRequired = data.isPVRRequired || false;

            if (data.EndTime) {
                const regex = /-?\d+/;
                const timeToParse = regex.exec(data.EndTime);
                if (timeToParse && timeToParse.length > 0) {
                    this.endTime = new Date(parseInt(timeToParse[0], 10));
                }
            }

            this.ageRangeStartValue = data.AgeRangeStartValue;
            this.parentalControl = data.ParentalControl;
            this.orderField = data.OrderField;
            this.orderMode = data.OrderMode;
            this.idavAssetID = data.IDAVAssetID;
        }
    }
}

export default VodContent;
