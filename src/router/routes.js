
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout1.vue'),
    children: [
      { path: '', component: () => import('pages/test.vue') },
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
