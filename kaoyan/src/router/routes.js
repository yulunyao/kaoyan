import Home from '@/views/views/home.vue'
import HomeFeature from '@/views/views/homeFeature.vue'
import Login from '@/views/views/login.vue'

const appRoutes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/login',
    children: [
      {
        path: '/homepage', name: 'homepage', component: HomeFeature, //Home,
        meta: { title: '主页' },
      }, 
    ]
  }
]

export const routes = [
  ...appRoutes
]
