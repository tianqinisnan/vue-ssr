const Vue = require('vue');
const VueServerRenderer = require('vue-server-renderer');
const Koa = require('koa');
const Router = require('@koa/router');
const fs = require('fs');
const static = require('koa-static');
const path = require('path');

let app = new Koa();  //创建一个server实例
let router = new Router();  //创建一个router实例

// let vm = new Vue({
//   data() {
//     return {
//       name: 'nan'
//     }
//   },
//   template: `<div>{{name}}</div>`
// })
// const template = fs.readFileSync('./template.html', 'utf-8');
// let render = VueServerRenderer.createRenderer({  //创建一个渲染器
//   template     // 用模板渲染
// });

// 需要使用打包后的 server.bundle.js 来生成模版html 返回给 客户端
// const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf-8');

// 客户端激活需要动态插入 客户端js 需要配合json 文件拿到js 文件名字引入
const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const clientManifest = require('./dist/vue-ssr-client-manifest.json');
const template = fs.readFileSync('./dist/index-ssr.html', 'utf-8');

let render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest  // 会自动找到对应关系找到 客户端js 文件名字
});

// router.get('/', async ctx => {
//   // ctx.body = await render.renderToString() //这种写法样式会不生效，采用下面回调的方式
//   ctx.body = await new Promise((resolve, reject) => {
//     render.renderToString({url: ctx.url}, (err, html) => {   // 返回一个promise
//       resolve(html)
//     })
//   })
// })

router.get('*', async ctx => {
  // ctx.body = await render.renderToString() //这种写法样式会不生效，采用下面回调的方式
  try {
    ctx.body = await new Promise((resolve, reject) => {
      render.renderToString({url: ctx.url}, (err, html) => {   // 返回一个promise
        if (err && err.code === 404) {
          resolve("Page Not Found");
        }
        resolve(html)
      })
    })
  } catch (e) {
    console.log(e);
  }
})

// 客户端激活 需要引入client.bundle.js 需要把dist设置成静态目录
app.use(static(path.resolve(__dirname, 'dist')));
// 注册路由
app.use(router.routes());
app.use(router.allowedMethods()); // 当请求出错时的处理逻辑

app.listen(3000);