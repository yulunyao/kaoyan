import Home from '@/views/views/home.vue'
import HomeFeature from '@/views/views/homeFeature.vue'

const appRoutes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/homepage', name: 'HomePage', component: HomeFeature, //Home,
        meta: { title: '主页' },
      }, 
    ]
  }
]

export const routes = [
  ...appRoutes
]
