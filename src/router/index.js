import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/store/AuthStore';

const routes = [
  {
    path: '/movies',
    name: 'indexMovie',
    component: () => import('../views/Movies/IndexMovieView.vue'),
    meta: { auth: true },
  },
  {
    path: '/movies/:id',
    name: 'showMovie',
    component: () => import('../views/Movies/ShowMovieView.vue'),
    meta: { auth: true },
  },
  {
    path: '/movies/create',
    name: 'createMovie',
    component: () => import('../views/Movies/CreateMovieView.vue'),
    meta: { auth: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Auth/RegisterView.vue'),
    meta: { auth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Auth/LoginView.vue'),
    meta: { auth: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'page404',
    component: () => import('../components/Page404.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if ('auth' in to.meta && to.meta.auth && !authStore.user) {
    next({ name: 'login', replace: true });
  } else if ('auth' in to.meta && !to.meta.auth && authStore.user) {
    next({ name: 'home', replace: true });
  } else {
    next();
  }
});

export default router;
