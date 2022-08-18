import Layout from '@/layout/'

export default {
    path: '/employees',
    name: 'employees',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/employees'),
            meta: {
                title: 'Employees',
                icon: "people"
            },

        },
        {
            path: "detail/:id",
            component: () => import('@/views/employees/detail.vue'),
            hidden: true,
            meta: {
                title: "员工详情"
            }
        }
    ]
}