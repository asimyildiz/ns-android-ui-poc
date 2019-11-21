import Home from './screens/Home'
import Live from './screens/Live'
import Movie from './screens/Movie'
import Player from './screens/Player'
import ContentDetail from './screens/ContentDetail'

export default {
    linkActiveClass: 'focus',
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => Home
        },
        {
            path: '/live',
            name: 'live',
            component: () => Live
        },
        {
            path: '/movie',
            name: 'movie',
            component: () => Movie
        },
        {
            path: '/player',
            name: 'player',
            component: () => Player
        },
        {
            path: '/contentDetail',
            name: 'contentDetail',
            component: () => ContentDetail
        }
    ]
};
