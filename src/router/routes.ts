import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/modules/movies/index.vue') },
      {
        path: '/movie',
        component: () => import('pages/modules/movies/index.vue'),
      },
      {
        path: '/movie/create',
        component: () => import('pages/modules/movies/create-movie.vue'),
      },
      {
        path: '/movie/edit/:id?',
        component: () => import('pages/modules/movies/edit-movie.vue'),
      },
      {
        path: '/album',
        component: () => import('pages/modules/album/index.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
