import Layout from '@/layout/'

export default {
    path:'/permission',
    name: 'permissions',
    component: Layout,
    children: [{
        path: '',
        component: ()=>import('@/views/permission'),
        meta: {
            title: 'Permission',
            icon: "lock"
        }
    }]
}