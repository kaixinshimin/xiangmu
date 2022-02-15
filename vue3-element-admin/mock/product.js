export default [
    {
      url: '/api/product',
      method: 'get',
      timeout: 100,
      response: {
        code: 200,
        message: '获取商品列表成功',
        data: [
            {
                id:1,
                name:'华为',
                price:9999
            },
            {
                id:2,
                name:'oppo',
                price:9999
            },
            {
                id:3,
                name:'vivo',
                price:9999
            }
        ],
      },
    },
  ]
  