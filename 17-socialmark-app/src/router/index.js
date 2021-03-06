import { createRouter, createWebHashHistory } from "vue-router";
import store from '../store'

const routes = [
    {
        name : "HomePage",
        path : "/",
        component : () => import("@/views/HomePage")
    },
    {
        name : "LoginPage",
        path : "/login",
        component : () => import("@/views/LoginPage")
    },
    {
        name : "RegisterPage",
        path : "/register",
        component : () => import("@/views/RegisterPage")
    },
    {
        name : "NewBookmarkPage",
        path : "/new",
        component : () => import("@/views/NewBookmark")
    },
    {
        name : "Favorites",
        path : "/favorites",
        meta : {
            componentName : "appBookmarkList"
        },
        component : () => import("@/views/Account")
    },
    {
        name : "likes",
        path : "/likes",
        component : () => import("@/views/Account"),
        meta : {
            componentName : "appBookmarkList"
        },
    },
    {
        name : "Settings",
        path : "/settings",
        component : () => import("@/views/Account"),
        meta : {
            componentName : "userSettings"
        },
    }
]

const router = createRouter({
    routes,
    history : createWebHashHistory()
});
router.beforeEach((to,from,next) => {
    const authRequiredRoutes = ["HomePage"];
    const authNotRequiredRoutes = ["LoginPage", "RegisterPage"];
    const _isAuthenticated = store.getters._isAuthenticated;
    if(authNotRequiredRoutes.indexOf(to.name) > -1 && _isAuthenticated) next(false);
    if(authRequiredRoutes.indexOf(to.name) > -1){
        if(_isAuthenticated) next();
        else next({ name : "LoginPage"})
    }
    else{
        next();
    }
});//

export default router;