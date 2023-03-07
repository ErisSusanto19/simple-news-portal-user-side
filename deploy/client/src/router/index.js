import { createRouter, createWebHistory } from 'vue-router'
import Register from "@/views/Register.vue"
import Login from "@/views/Login.vue"
import Home from "@/views/Home.vue"
import Bookmark from "@/views/Bookmark.vue"
import Detail from "@/views/Detail.vue"
import NotFound from "@/views/NotFound.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/bookmark',
      name: 'bookmark',
      component: Bookmark
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  const auth = localStorage.access_token
  if(auth && to.name === "login" || auth && to.name === "register") next("/")
  else if( !auth && to.name == "bookmark") next("/login")
  else next()
})

export default router
