<template>
  <div class="bar" @click="handleClick">
    bar
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    handleClick() {
      alert(1);
    }
  }
}
</script>

<style scoped>
.bar {
  color: red;
}
</style>