import Layout from '@/layout/'

export default {
    path: '/setting',
    name: 'settings',
    component: Layout,
    children: [{
        path: '',
        component: () => import('@/views/setting'),
        meta: {
            title: 'Setting',
            icon: "setting"
        }
    }]
}