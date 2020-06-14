<template>
  <div id="app">
    <div>
      <router-link to="/">Foo</router-link>
      <router-link to="/bar">Bar</router-link>

      <!-- 前端路由渲染 通过histor api 实现 -->
      <!-- 只有强制刷新首屏才需要服务端渲染，后续路由都是前端渲染 -->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Foo from './components/Foo.vue';
import Bar from './components/Bar.vue';
export default {
  components: {
    Foo,
    Bar
  }
}
</script>