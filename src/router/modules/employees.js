import Layout from '@/layout/'

export default {
    path: '/employees',
    name: 'employees',
    component: Layout,
    children: [
        {
            path: '',
            component: () => import('@/views/employees'),
            name: 'employees',
            meta: {
                title: '员工',
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
        },
        {
            path: "print/:id",
            component: ()=> import("@/views/employees/print.vue"),
            hidden:true,
            meta: {
                title: "员工打印",
                icon: 'people'
            }
        }
    ]
}