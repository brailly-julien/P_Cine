import { createRouter, createWebHistory } from 'vue-router'
import PageAccueil from './components/PageAccueil.vue'
import SignUp from './components/SignUp.vue'
import CinemaMenu from './components/CinemaMenu.vue'
import PageRestauration from './components/PageRestauration.vue'
import PageSetup from './components/PageSetup.vue'
import PagePanier from './components/PagePanier'

const routes = [
  { path: '/', component: PageAccueil },
  { path: '/signup', component: SignUp },
  { path: '/cinemamenu', component: CinemaMenu },
  { path: '/pagerestauration', component: PageRestauration },
  { path: '/pagesetup', component: PageSetup },
  { path: '/pagepanier', component: PagePanier },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
