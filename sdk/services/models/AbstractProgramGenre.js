/**
 * class for program genre model
 * @model AbstractProgramGenre
 */
class AbstractProgramGenre {
    /**
     * @type {Number}
     */
    static get UNDEFINED() {
        return 0;
    }

    // /////////////////////////
    // Movie/Drama
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get MOVIE() {
        return 0x10;
    }

    /**
     * @type {Number}
     */
    static get DETECTIVE_THRILLER() {
        return 0x11;
    }

    /**
     * @type {Number}
     */
    static get ADVENTURE_WESTERN_WAR() {
        return 0x12;
    }

    /**
     * @type {Number}
     */
    static get SCIENCE_FICTION_FANTASY_HORROR() {
        return 0x13;
    }

    /**
     * @type {Number}
     */
    static get COMEDY() {
        return 0x14;
    }

    /**
     * @type {Number}
     */
    static get SOAP_MELODRAMA_FOLKLORIC() {
        return 0x15;
    }

    /**
     * @type {Number}
     */
    static get ROMANCE() {
        return 0x16;
    }

    /**
     * @type {Number}
     */
    static get SERIOUS_CLASSICAL_RELIGIOUS_HISTORICAL_MOVIE_DRAMA() {
        return 0x17;
    }

    /**
     * @type {Number}
     */
    static get ADULT() {
        return 0x18;
    }

    // /////////////////////////
    // News/Current affairs
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get NEWS() {
        return 0x20;
    }

    /**
     * @type {Number}
     */
    static get NEWS_WEATHER_REPORT() {
        return 0x21;
    }

    /**
     * @type {Number}
     */
    static get NEWS_MAGAZINE() {
        return 0x22;
    }

    /**
     * @type {Number}
     */
    static get DOCUMENTARY() {
        return 0x23;
    }

    /**
     * @type {Number}
     */
    static get DISCUSSION_INTERVIEW_DEBATE() {
        return 0x24;
    }

    // /////////////////////////
    // Show/Game show
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get SHOW() {
        return 0x30;
    }

    /**
     * @type {Number}
     */
    static get GAME_SHOW_QUIZ_CONTEST() {
        return 0x31;
    }

    /**
     * @type {Number}
     */
    static get VARIETY_SHOW() {
        return 0x32;
    }

    /**
     * @type {Number}
     */
    static get TALK_SHOW() {
        return 0x33;
    }

    // /////////////////////////
    // Sports
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get SPORTS() {
        return 0x40;
    }

    /**
     * @type {Number}
     */
    static get SPECIAL_EVENTS() {
        return 0x41;
    }

    /**
     * @type {Number}
     */
    static get SPORTS_MAGAZINES() {
        return 0x42;
    }

    /**
     * @type {Number}
     */
    static get FOOTBALL_SOCCER() {
        return 0x43;
    }

    /**
     * @type {Number}
     */
    static get TENNIS_SQUASH() {
        return 0x44;
    }

    /**
     * @type {Number}
     */
    static get TEAM_SPORTS() {
        return 0x45;
    }

    /**
     * @type {Number}
     */
    static get ATHLETICS() {
        return 0x46;
    }

    /**
     * @type {Number}
     */
    static get MOTOR_SPORT() {
        return 0x47;
    }

    /**
     * @type {Number}
     */
    static get WATER_SPORT() {
        return 0x48;
    }

    /**
     * @type {Number}
     */
    static get WINTER_SPORT() {
        return 0x49;
    }

    /**
     * @type {Number}
     */
    static get EQUESTRIAN() {
        return 0x4A;
    }

    /**
     * @type {Number}
     */
    static get MARTIAL_SPORT() {
        return 0x4B;
    }

    // /////////////////////////
    // Children's/Youth programmes
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get CHILDREN() {
        return 0x50;
    }

    /**
     * @type {Number}
     */
    static get PRE_SCHOOL_CHILDRENS_PROGRAMMES() {
        return 0x51;
    }

    /**
     * @type {Number}
     */
    static get ENTERTAINMENT_PROGRAMMES_FOR_6_TO_14() {
        return 0x52;
    }

    /**
     * @type {Number}
     */
    static get ENTERTAINMENT_PROGRAMMES_FOR_10_TO_16() {
        return 0x53;
    }

    /**
     * @type {Number}
     */
    static get INFORMATIONAL_EDUCATIONAL_SCHOOL_PROGRAMMES() {
        return 0x54;
    }

    /**
     * @type {Number}
     */
    static get CARTOONS_PUPPETS() {
        return 0x55;
    }

    // /////////////////////////
    // Music/Ballet/Dance
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get MUSIC() {
        return 0x60;
    }

    /**
     * @type {Number}
     */
    static get ROCK_POP() {
        return 0x61;
    }

    /**
     * @type {Number}
     */
    static get SERIOUS_MUSIC_CLASSICAL_MUSIC() {
        return 0x62;
    }

    /**
     * @type {Number}
     */
    static get FOLK_TRADITIONAL_MUSIC() {
        return 0x63;
    }

    /**
     * @type {Number}
     */
    static get JAZZ() {
        return 0x64;
    }

    /**
     * @type {Number}
     */
    static get MUSICAL_OPERA() {
        return 0x65;
    }

    /**
     * @type {Number}
     */
    static get BALLET() {
        return 0x66;
    }

    // /////////////////////////
    // Arts/Culture
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get ARTS() {
        return 0x70;
    }

    /**
     * @type {Number}
     */
    static get PERFORMING_ARTS() {
        return 0x71;
    }

    /**
     * @type {Number}
     */
    static get FINE_ARTS() {
        return 0x72;
    }

    /**
     * @type {Number}
     */
    static get RELIGION() {
        return 0x73;
    }

    /**
     * @type {Number}
     */
    static get POPULAR_CULTURE_TRADITIONAL_ARTS() {
        return 0x74;
    }

    /**
     * @type {Number}
     */
    static get LITERATURE() {
        return 0x75;
    }

    /**
     * @type {Number}
     */
    static get FILM_CINEMA() {
        return 0x76;
    }

    /**
     * @type {Number}
     */
    static get EXPERIMENTAL_FILM_VIDEO() {
        return 0x77;
    }

    /**
     * @type {Number}
     */
    static get BROADCASTING_PRESS() {
        return 0x78;
    }

    /**
     * @type {Number}
     */
    static get NEW_MEDIA() {
        return 0x79;
    }

    /**
     * @type {Number}
     */
    static get ARTS_CULTURE_MAGAZINES() {
        return 0x7A;
    }

    /**
     * @type {Number}
     */
    static get FASHION() {
        return 0x7B;
    }

    // /////////////////////////
    // Social/Political issues/Economics
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get SOCIAL() {
        return 0x80;
    }

    /**
     * @type {Number}
     */
    static get MAGAZINES_REPORTS_DOCUMENTARY() {
        return 0x81;
    }

    /**
     * @type {Number}
     */
    static get ECONOMICS_SOCIAL_ADVISORY() {
        return 0x82;
    }

    /**
     * @type {Number}
     */
    static get REMARKABLE_PEOPLE() {
        return 0x83;
    }

    // /////////////////////////
    // Education/Science/Factual topics
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get EDUCATION() {
        return 0x90;
    }

    /**
     * @type {Number}
     */
    static get NATURE_ANIMALS_ENVIRONMENT() {
        return 0x91;
    }

    /**
     * @type {Number}
     */
    static get TECHNOLOGY_NATURAL_SCIENCES() {
        return 0x92;
    }

    /**
     * @type {Number}
     */
    static get MEDICINE_PHYSIOLOGY_PSYCHOLOGY() {
        return 0x93;
    }

    /**
     * @type {Number}
     */
    static get FOREIGN_COUNTRIES_EXPEDITIONS() {
        return 0x94;
    }

    /**
     * @type {Number}
     */
    static get SOCIAL_SPIRITUAL_SCIENCES() {
        return 0x95;
    }

    /**
     * @type {Number}
     */
    static get FURTHER_EDUCATION() {
        return 0x96;
    }

    /**
     * @type {Number}
     */
    static get LANGUAGES() {
        return 0x97;
    }

    // /////////////////////////
    // Leisure hobbies
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get LEISURE() {
        return 0xA0;
    }

    /**
     * @type {Number}
     */
    static get TOURISM_TRAVEL() {
        return 0xA1;
    }

    /**
     * @type {Number}
     */
    static get HANDICRAFT() {
        return 0xA2;
    }

    /**
     * @type {Number}
     */
    static get MOTORING() {
        return 0xA3;
    }

    /**
     * @type {Number}
     */
    static get FITNESS_AND_HEALTH() {
        return 0xA4;
    }

    /**
     * @type {Number}
     */
    static get COOKING() {
        return 0xA5;
    }

    /**
     * @type {Number}
     */
    static get ADVERTISEMENT_SHOPPING() {
        return 0xA6;
    }

    /**
     * @type {Number}
     */
    static get GARDENING() {
        return 0xA7;
    }

    // /////////////////////////
    // Special characteristics
    // /////////////////////////
    /**
     * @type {Number}
     */
    static get ORIGINAL_LANGUAGE() {
        return 0xB0;
    }

    /**
     * @type {Number}
     */
    static get BLACK_AND_WHITE() {
        return 0xB1;
    }

    /**
     * @type {Number}
     */
    static get UNPUBLISHED() {
        return 0xB2;
    }

    /**
     * @type {Number}
     */
    static get LIVE_BROADCAST() {
        return 0xB3;
    }

    /**
     * @type {Number}
     */
    static get PLANO_STEREOSCOPIC() {
        return 0xB4;
    }

    /**
     * @type {Number}
     */
    static get LOCAL_OR_REGIONAL() {
        return 0xB5;
    }
}

export default AbstractProgramGenre;
