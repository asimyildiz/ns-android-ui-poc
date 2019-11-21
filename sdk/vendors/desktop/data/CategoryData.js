/**
 * List of categories
 * @type {Object[]}
 */
const categoryData = [
    {
        id: 4,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Série d'action"
    },
    {
        id: 7,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Série d'animation"
    },
    {
        id: 9,
        content_nibble_lvl_1: 50,
        content_nibble_lvl_2: "Dessin animé d'animation"
    },
    {
        id: 10,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Série d'aventures"
    },
    {
        id: 13,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série burlesque'
    },
    {
        id: 21,
        content_nibble_lvl_1: 50,
        content_nibble_lvl_2: 'Dessin animé'
    },
    {
        id: 22,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série érotique'
    },
    {
        id: 25,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série fantastique'
    },
    {
        id: 28,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série historique'
    },
    {
        id: 31,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série humoristique'
    },
    {
        id: 34,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série jeunesse'
    },
    {
        id: 36,
        content_nibble_lvl_1: 50,
        content_nibble_lvl_2: 'Dessin animé jeunesse'
    },
    {
        id: 37,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série marionnettes'
    },
    {
        id: 43,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série policière'
    },
    {
        id: 49,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série sentimental'
    },
    {
        id: 50,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Feuilleton sentimental'
    },
    {
        id: 52,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série sentimentale'
    },
    {
        id: 55,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série à sketches'
    },
    {
        id: 58,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série de suspense'
    },
    {
        id: 61,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série western'
    },
    {
        id: 64,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série Autre'
    },
    {
        id: 66,
        content_nibble_lvl_1: 50,
        content_nibble_lvl_2: 'Dessin animé Autre'
    },
    {
        id: 67,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Blues & Soul'
    },
    {
        id: 68,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Classique'
    },
    {
        id: 69,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Contemporain'
    },
    {
        id: 71,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Dance Music'
    },
    {
        id: 72,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Jazz'
    },
    {
        id: 73,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Pop & Rock'
    },
    {
        id: 74,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Rap & Techno'
    },
    {
        id: 75,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Variétés'
    },
    {
        id: 76,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'World Music'
    },
    {
        id: 77,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Autre'
    },
    {
        id: 82,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Pièce de théâtre'
    },
    {
        id: 85,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Classique'
    },
    {
        id: 86,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Contemporain'
    },
    {
        id: 87,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Opéra'
    },
    {
        id: 89,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Oratorio'
    },
    {
        id: 90,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Opéra bouffe'
    },
    {
        id: 91,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Opéra comique'
    },
    {
        id: 95,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Drame lyrique'
    },
    {
        id: 100,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Cirque'
    },
    {
        id: 102,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Musical'
    },
    {
        id: 104,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Humour'
    },
    {
        id: 108,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Autre'
    },
    {
        id: 109,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Chorégraphique'
    },
    {
        id: 110,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Biographie'
    },
    {
        id: 123,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie'
    },
    {
        id: 124,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie burlesque'
    },
    {
        id: 130,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie dramatique'
    },
    {
        id: 132,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie fantastique'
    },
    {
        id: 135,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie musicale'
    },
    {
        id: 136,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie noire'
    },
    {
        id: 138,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie policière'
    },
    {
        id: 139,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie romantique'
    },
    {
        id: 140,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie satirique'
    },
    {
        id: 141,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie sentimentale'
    },
    {
        id: 143,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Comédie érotique'
    },
    {
        id: 145,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Conte'
    },
    {
        id: 153,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Court métrage'
    },
    {
        id: 155,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Court métrage d'animation"
    },
    {
        id: 156,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Court métrage dramatique'
    },
    {
        id: 163,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Drame'
    },
    {
        id: 165,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Drame criminel'
    },
    {
        id: 174,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Drame historique'
    },
    {
        id: 181,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Drame psychologique'
    },
    {
        id: 187,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Drame sentimental'
    },
    {
        id: 188,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Drame social'
    },
    {
        id: 194,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Essai'
    },
    {
        id: 218,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Film d'action"
    },
    {
        id: 219,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Film d'animation"
    },
    {
        id: 224,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Film d'aventures"
    },
    {
        id: 229,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Film d'espionnage"
    },
    {
        id: 230,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Film d'horreur"
    },
    {
        id: 234,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Film d'épouvante"
    },
    {
        id: 238,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film de guerre'
    },
    {
        id: 240,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film de kung-fu'
    },
    {
        id: 248,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film de science-fiction'
    },
    {
        id: 249,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film de suspense'
    },
    {
        id: 251,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film documentaire'
    },
    {
        id: 253,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film du terroir'
    },
    {
        id: 254,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film fantastique'
    },
    {
        id: 256,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film historique'
    },
    {
        id: 257,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film musical'
    },
    {
        id: 261,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film noir'
    },
    {
        id: 267,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film policier'
    },
    {
        id: 269,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film pornographique'
    },
    {
        id: 270,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film pour la jeunesse'
    },
    {
        id: 277,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film sentimental'
    },
    {
        id: 282,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film érotique'
    },
    {
        id: 284,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Film à sketches'
    },
    {
        id: 288,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Moyen métrage'
    },
    {
        id: 289,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Mélodrame'
    },
    {
        id: 298,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Péplum'
    },
    {
        id: 307,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Thriller'
    },
    {
        id: 308,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Thriller politique'
    },
    {
        id: 310,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm biographique'
    },
    {
        id: 311,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm catastrophe'
    },
    {
        id: 313,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Téléfilm d'action"
    },
    {
        id: 314,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Téléfilm d'animation"
    },
    {
        id: 315,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Téléfilm d'aventures"
    },
    {
        id: 317,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Téléfilm d'horreur"
    },
    {
        id: 318,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: "Téléfilm d'épouvante"
    },
    {
        id: 319,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm de guerre'
    },
    {
        id: 321,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm de science-fiction'
    },
    {
        id: 322,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm de suspense'
    },
    {
        id: 324,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm dramatique'
    },
    {
        id: 325,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm du terroir'
    },
    {
        id: 326,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm fantastique'
    },
    {
        id: 327,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm féerique'
    },
    {
        id: 328,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm historique'
    },
    {
        id: 329,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm humoristique'
    },
    {
        id: 330,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm musical'
    },
    {
        id: 333,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm pilote'
    },
    {
        id: 334,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm policier'
    },
    {
        id: 335,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm politique'
    },
    {
        id: 336,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm pornographique'
    },
    {
        id: 337,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm pour la jeunesse'
    },
    {
        id: 338,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm romanesque'
    },
    {
        id: 340,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm sentimental'
    },
    {
        id: 341,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Téléfilm érotique'
    },
    {
        id: 344,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Western'
    },
    {
        id: 353,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Autre'
    },
    {
        id: 354,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Animalier'
    },
    {
        id: 356,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Aventures'
    },
    {
        id: 357,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Cinéma'
    },
    {
        id: 358,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Civilisations'
    },
    {
        id: 359,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Musique classique'
    },
    {
        id: 361,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Culture'
    },
    {
        id: 362,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Découvertes'
    },
    {
        id: 363,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Histoire'
    },
    {
        id: 364,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Jazz'
    },
    {
        id: 365,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Lettres'
    },
    {
        id: 367,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Musique'
    },
    {
        id: 368,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Nature'
    },
    {
        id: 369,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Politique'
    },
    {
        id: 370,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Rock-pop'
    },
    {
        id: 371,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Religions'
    },
    {
        id: 372,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Santé'
    },
    {
        id: 373,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Sciences et technique'
    },
    {
        id: 374,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Société'
    },
    {
        id: 375,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Sport'
    },
    {
        id: 378,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Autre'
    },
    {
        id: 379,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine d'actualité"
    },
    {
        id: 381,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine animalier'
    },
    {
        id: 383,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine de l'automobile"
    },
    {
        id: 384,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine de l'aventure"
    },
    {
        id: 385,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de charme'
    },
    {
        id: 386,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du cinéma'
    },
    {
        id: 387,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du court métrage'
    },
    {
        id: 388,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du consommateur'
    },
    {
        id: 389,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine culinaire'
    },
    {
        id: 390,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine culturel'
    },
    {
        id: 391,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de découvertes'
    },
    {
        id: 393,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine de l'économie"
    },
    {
        id: 394,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine éducatif'
    },
    {
        id: 395,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine de l'emploi"
    },
    {
        id: 396,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de la femme'
    },
    {
        id: 397,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine gastronomique'
    },
    {
        id: 398,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de géopolitique'
    },
    {
        id: 399,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine hippique'
    },
    {
        id: 400,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine historique'
    },
    {
        id: 401,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine d'information"
    },
    {
        id: 402,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du jazz'
    },
    {
        id: 403,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine jeunesse'
    },
    {
        id: 404,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine juridique'
    },
    {
        id: 405,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine littéraire'
    },
    {
        id: 406,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine des loisirs'
    },
    {
        id: 407,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine médical'
    },
    {
        id: 408,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de la mer'
    },
    {
        id: 409,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de la mode'
    },
    {
        id: 411,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du multimédia'
    },
    {
        id: 412,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine musical'
    },
    {
        id: 413,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de la nature'
    },
    {
        id: 414,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine politique'
    },
    {
        id: 415,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine pornographique'
    },
    {
        id: 416,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine régional'
    },
    {
        id: 417,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine religieux'
    },
    {
        id: 418,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de reportages'
    },
    {
        id: 419,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de la santé'
    },
    {
        id: 420,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine scientifique'
    },
    {
        id: 421,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de services'
    },
    {
        id: 422,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du show-biz'
    },
    {
        id: 423,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de société'
    },
    {
        id: 424,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine sportif'
    },
    {
        id: 425,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de télé-achat'
    },
    {
        id: 426,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine touristique'
    },
    {
        id: 427,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du jeu vidéo'
    },
    {
        id: 431,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'NASCAR'
    },
    {
        id: 437,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Formule 1'
    },
    {
        id: 438,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Formule 1'
    },
    {
        id: 446,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Rallye'
    },
    {
        id: 453,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Voitures de tourisme'
    },
    {
        id: 464,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Automobilisme'
    },
    {
        id: 465,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Automobilisme'
    },
    {
        id: 482,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Rallycross'
    },
    {
        id: 489,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Fitness'
    },
    {
        id: 494,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Judo'
    },
    {
        id: 516,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Arts martiaux'
    },
    {
        id: 557,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Basket-ball'
    },
    {
        id: 558,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Basket-ball'
    },
    {
        id: 560,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Biathlon'
    },
    {
        id: 561,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Biathlon'
    },
    {
        id: 562,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Biathlon'
    },
    {
        id: 569,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Snooker'
    },
    {
        id: 572,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Bobsleigh'
    },
    {
        id: 578,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Bowling'
    },
    {
        id: 584,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Boxe'
    },
    {
        id: 585,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Boxe'
    },
    {
        id: 587,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Kick-boxing'
    },
    {
        id: 602,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Catch'
    },
    {
        id: 603,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Catch'
    },
    {
        id: 608,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Cricket'
    },
    {
        id: 611,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Curling'
    },
    {
        id: 615,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Cyclisme'
    },
    {
        id: 629,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Danse sportive'
    },
    {
        id: 641,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Football'
    },
    {
        id: 642,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Football'
    },
    {
        id: 644,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Beach soccer'
    },
    {
        id: 647,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Football américain'
    },
    {
        id: 648,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Football américain'
    },
    {
        id: 653,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Golf'
    },
    {
        id: 654,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Golf'
    },
    {
        id: 656,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Gymnastique artistique'
    },
    {
        id: 668,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Handball'
    },
    {
        id: 669,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Handball'
    },
    {
        id: 674,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Hockey sur glace'
    },
    {
        id: 686,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Luge'
    },
    {
        id: 741,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Multisports'
    },
    {
        id: 758,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Patinage de vitesse'
    },
    {
        id: 764,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Patinage artistique'
    },
    {
        id: 797,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Rugby'
    },
    {
        id: 798,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Rugby'
    },
    {
        id: 800,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Rugby à XIII'
    },
    {
        id: 801,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Rugby à XIII'
    },
    {
        id: 803,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Ski'
    },
    {
        id: 804,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Ski'
    },
    {
        id: 806,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Combiné nordique'
    },
    {
        id: 809,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Saut à ski'
    },
    {
        id: 812,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Ski de fond'
    },
    {
        id: 827,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Snowboard'
    },
    {
        id: 830,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Equitation'
    },
    {
        id: 831,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Equitation'
    },
    {
        id: 836,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Hippisme'
    },
    {
        id: 837,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Hippisme'
    },
    {
        id: 850,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Surf'
    },
    {
        id: 872,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Sport de force'
    },
    {
        id: 876,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Sports nautiques'
    },
    {
        id: 877,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Sports nautiques'
    },
    {
        id: 882,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Tennis'
    },
    {
        id: 899,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Voile'
    },
    {
        id: 900,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Voile'
    },
    {
        id: 901,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Voile'
    },
    {
        id: 905,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Volley-ball'
    },
    {
        id: 921,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Sports mécaniques'
    },
    {
        id: 932,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Divertissement'
    },
    {
        id: 933,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Emission politique'
    },
    {
        id: 934,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Variétés'
    },
    {
        id: 935,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Débat'
    },
    {
        id: 936,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Emission spéciale'
    },
    {
        id: 937,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Emission religieuse'
    },
    {
        id: 943,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Autre'
    },
    {
        id: 944,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine Autre'
    },
    {
        id: 945,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Autre'
    },
    {
        id: 947,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Autre'
    },
    {
        id: 948,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Sport'
    },
    {
        id: 950,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Jeu'
    },
    {
        id: 951,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Météo'
    },
    {
        id: 952,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Journal'
    },
    {
        id: 953,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Tiercé'
    },
    {
        id: 955,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Emission jeunesse'
    },
    {
        id: 956,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Emission musicale'
    },
    {
        id: 957,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Divertissement-humour'
    },
    {
        id: 961,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Clips'
    },
    {
        id: 964,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Talk show'
    },
    {
        id: 967,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Téléréalité'
    },
    {
        id: 968,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série juridique'
    },
    {
        id: 969,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série dramatique'
    },
    {
        id: 970,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série hospitalière'
    },
    {
        id: 972,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Economie'
    },
    {
        id: 973,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Environnement'
    },
    {
        id: 975,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Reggae'
    },
    {
        id: 977,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'Rap'
    },
    {
        id: 979,
        content_nibble_lvl_1: 50,
        content_nibble_lvl_2: 'Dessin animé manga'
    },
    {
        id: 980,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Téléréalité'
    },
    {
        id: 981,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine de l'environnement"
    },
    {
        id: 985,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Grand Tourisme'
    },
    {
        id: 1001,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'K-1'
    },
    {
        id: 1007,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Ski freestyle'
    },
    {
        id: 1008,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Motocross freestyle'
    },
    {
        id: 1014,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Motocross freestyle'
    },
    {
        id: 1022,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série de téléréalité'
    },
    {
        id: 1023,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série de guerre'
    },
    {
        id: 1024,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Débat parlementaire'
    },
    {
        id: 1025,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Interview'
    },
    {
        id: 1026,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série réaliste'
    },
    {
        id: 1028,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Feuilleton réaliste'
    },
    {
        id: 1030,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'fiction'
    },
    {
        id: 1032,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Poker'
    },
    {
        id: 1033,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Poker'
    },
    {
        id: 1036,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Sports de combat'
    },
    {
        id: 1038,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Free Fight'
    },
    {
        id: 1056,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Fin'
    },
    {
        id: 1057,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Programme indéterminé'
    },
    {
        id: 1058,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série de science-fiction'
    },
    {
        id: 1063,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Sports extrêmes'
    },
    {
        id: 1065,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Rugby à 7'
    },
    {
        id: 1068,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Boule anglaise'
    },
    {
        id: 1080,
        content_nibble_lvl_1: 40,
        content_nibble_lvl_2: 'Futsal'
    },
    {
        id: 1083,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Loterie'
    },
    {
        id: 1094,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Série musicale'
    },
    {
        id: 1095,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Chasse'
    },
    {
        id: 1096,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Pêche'
    },
    {
        id: 1098,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de la pêche'
    },
    {
        id: 1103,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: "Magazine de l'art de vivre"
    },
    {
        id: 1104,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine de la décoration'
    },
    {
        id: 1105,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du bricolage'
    },
    {
        id: 1106,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Magazine du jardinage'
    },
    {
        id: 1107,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Géopolitique'
    },
    {
        id: 1108,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Art de vivre'
    },
    {
        id: 1109,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Multimédia'
    },
    {
        id: 1110,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Education'
    },
    {
        id: 1111,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Gastronomie'
    },
    {
        id: 1112,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Justice'
    },
    {
        id: 1113,
        content_nibble_lvl_1: 90,
        content_nibble_lvl_2: 'Voyage'
    },
    {
        id: 1115,
        content_nibble_lvl_1: 60,
        content_nibble_lvl_2: 'One man show'
    },
    {
        id: 1116,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Fitness'
    },
    {
        id: 1117,
        content_nibble_lvl_1: 100,
        content_nibble_lvl_2: 'Emission du bien-être'
    },
    {
        id: 10000,
        content_nibble_lvl_1: 10,
        content_nibble_lvl_2: 'Autre'
    }
];
