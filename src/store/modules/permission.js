// File for dynamic Routers
import { constantRoutes, asyncRoutes } from "@/router/"

const state = {
    routes: constantRoutes  // User's all of roter
}

const mutations = {
    setRoutes(state, newRoutes) {
        // state.routes = [...state.routes, ...newRoutes]
        state.routes = [...constantRoutes, ...newRoutes]
    }
}

const actions = {
    

    // Select Access Routue
    // menus: ["settings","permissions"]
    filterRoutes(context, menus) {
        const routes = []

        menus.forEach(key=> {
            routes.push(...asyncRoutes.filter(item=> item.name === key)) 
        })
        
        // Static routes + Dynamic routes
        context.commit("setRoutes", routes)

        return routes
    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}