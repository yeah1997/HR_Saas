// Router
import router from "@/router";
// Vuex
import store from '@/store'

import nProgress from "nprogress";
import 'nprogress/nprogress.css'

const whiteList = ['/login', '/404']  // white list

router.beforeEach(async (to, from, next) => {

    nProgress.start()

    // There's Token 
    if (store.getters.token) {
        // To login page
        if (to.path === '/login') {
            next('/')
        } else {
            if (!store.getters.userId) {
                const { roles } = await store.dispatch('user/getUserInfo')
                const routes = await store.dispatch('permission/filterRoutes', roles.menus)
                // console.log(routes);

                router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
                next(to.path)
            }else {
                next()
            }
            
        }
    } else {
        // There's no token && To noToken Page
        if (whiteList.indexOf(to.path) > -1) {
            next()
        } else {
            next('/login')
        }
    }

    nProgress.done()
})

router.afterEach(() => {
    nProgress.done()
})