import { createRouter, createWebHistory } from 'vue-router'
import SeatPage from './components/SeatPage.vue'
import PageAccueil from './components/PageAccueil.vue'
import SignUp from './components/SignUp.vue'
import CinemaMenu from './components/CinemaMenu.vue'
import PageRestauration from './components/PageRestauration.vue'
import PageSetup from './components/PageSetup.vue'
import PagePanier from './components/PagePanier'
import PageLangue from './components/PageLangue.vue'
import PageSon from './components/PageSon.vue'

const routes = [
  { path: '/', component: SeatPage },
  { path: '/pageaccueil', component: PageAccueil },
  { path: '/signup', component: SignUp },
  { path: '/cinemamenu', component: CinemaMenu },
  { path: '/pagerestauration', component: PageRestauration },
  { path: '/pagesetup', component: PageSetup },
  { path: '/pagepanier', component: PagePanier },
  { path: '/pagelangue', component: PageLangue },
  { path: '/pageson', component: PageSon },
]

const router = createRouter({
  history: createWebHistory(),
  routes, // short for `routes: routes`
})

export default router
