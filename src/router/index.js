import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ShareExpenseView from '../views/ShareExpenseView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta:{
      title:'Sale | Gasto Compartido | Para dedicarnos a lo más importante'
    }
  },
  {
    path: '/gasto/:id',
    name: 'share-expense',
    component: ShareExpenseView,
    meta:{
      title:'Gasto Compartido | Para dedicarnos a lo más importante',
      nav_back_button:true
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if(to.meta.title) document.title = to.meta.title
})

export default router
