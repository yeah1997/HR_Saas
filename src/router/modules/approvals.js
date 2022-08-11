import Layout from '@/layout/'
import { Icon } from 'element-ui'

export default {
    path:'/approvals',
    name: 'approvals',
    component: Layout,
    children: [{
        path: '',
        component: ()=>import('@/views/approvals'),
        meta: {
            title: 'Approvals',
            icon: "tree-table"
        }
    }]
}