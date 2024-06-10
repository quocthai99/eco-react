import { path } from "./path";
import { icons } from './icons'

const { AiOutlineDashboard, MdGroup } = icons

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

export const adminSidebar = [
    {
        id: 1,
        type: 'single',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <AiOutlineDashboard />
    },
    {
        id: 2,
        type: 'single',
        text: 'Manage users',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <MdGroup />
    },
    {
        id: 3,
        type: 'parent',
        text: 'Manage products',
        icon: <MdGroup />,
        subMenu: [
            {
                text: 'Create product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
            },
            {
                text: 'Manege products',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
            }
        ]
    },
    {
        id: 4,
        type: 'single',
        text: 'Manage other',
        path: `/${path.ADMIN}/${path.MANAGE_OTHER}`,
        icon: <AiOutlineDashboard />
    },
]