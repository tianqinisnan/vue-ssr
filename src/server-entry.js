// 服务端应该每个请求都返回一个独立的Vue 实例
import createApp from './app';

// 服务端渲染打包需要返回一个函数
// 调用 renderToString, 会传入信息, 渲染实例
export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();
  
    // 跳转时路由可能是异步加载的
    router.push(context.url);

    router.onReady(() => {
      // 前端如果没有配置路由 应该返回 404 页面
      const matchComponents = router.getMatchedComponents();// 获取匹配的组件个数
      if (!matchComponents.length) {
        return reject({code: 404});
      }

      // 匹配到路由了
      Promise.all(matchComponents.map(component => {
        // asyncData 只能定义在路由级别的组件中，供后端调用，操作vuex
        if (component.asyncData) {
          return component.asyncData(store);  // 必须返回promise
        }
      })).then(() => {
        context.state = store.state;

        // 此方法返回一个promise
        resolve(app)
      })
    }, reject);
  })
}