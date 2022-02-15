const Layout = () => import('@/layout/index.vue')
const product = () => import('@/views/product/index.vue')
const addProduct = () => import('@/views/product/add/index.vue')
const changeProduct = () => import('@/views/product/change/index.vue')

export default [
  {
    path: '/product',
    component: Layout,
    name: 'product',
    meta: {
      title: '商品',
    },
    icon: 'el-icon-help',
    children: [
      {
        path: '/product',
        name: 'productList',
        component: product,
        meta: {
          title: '商品列表',
          noCache: true,
        },
      },
      {
        path: '/product/add',
        name: 'addProduct',
        component: addProduct,
        meta: {
          title: '添加商品',
        },
      },
      {
        path: '/product/change/:id?',
        name: 'changeProduct',
        component: changeProduct,
        meta: {
          title: '修改商品',
          noCache: true,
        },
        hidden: true,
        props: true,
      },
    ],
  },
]
