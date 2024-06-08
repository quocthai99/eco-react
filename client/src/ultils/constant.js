import { path } from "./path";

export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQs',
        path: `/${path.FAQ}`
    },
]

export const colors = [
    { color: 'red', id: 1},
    { color: 'white', id: 2},
    { color: 'black', id: 3},
    { color: 'gold', id: 4},
]

export const voteOptions = [
    {
        id: 1,
        text: 'Terrible'
    },
    {
        id: 2,
        text: 'Bad'
    },
    {
        id: 3,
        text: 'Nomal'
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Perfect'
    },
]