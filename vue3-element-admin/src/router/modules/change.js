const Layout = () => import('@/layout/index.vue')
const revamp = () => import('@/views/user/index.vue')

export default [
  {
    path: '/revamp',
    name: 'torevamp',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '',
        name: 'revamp',
        component: revamp,
        meta: {
          title: '修改密码',
        },
      },
    ],
  },
]
