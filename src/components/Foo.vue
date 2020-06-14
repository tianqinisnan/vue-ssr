<template>
  <div class="foo">
    Foo
    {{$store.state.name}}
    {{$store.state.age}}
  </div>
</template>

<script>
export default {
  asyncData(store) {  //供后端调用渲染
    return store.dispatch('changeAll');
  },
  mounted() {  //前端调用渲染
    this.$store.dispatch('changeAll');
  },
  data() {
    return {}
  },
  methods: {
  
  }
}
</script>

<style scoped>
.foo {
  color: #699;
}
</style>