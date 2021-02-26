import Home from '@/views/views/home.vue'
import HomeFeature from '@/views/views/homeFeature.vue'
import Login from '@/views/views/login.vue'
import ToolCollection from '@/views/views/toolCollection.vue'

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
  },
  {
    path: '/toolCollection',
    name: 'toolCollection', 
    component: ToolCollection
  }
]

export const routes = [
  ...appRoutes
]
