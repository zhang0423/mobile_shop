<template>
  <div id="app">
    <router-view />
    <MyTabbar v-if="$route.meta.tabbarShow" />
  </div>
</template>
<script>
import MyTabbar from "./components/MyTabbar.vue";
export default {
  components: { MyTabbar },
  created() {},
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  background: #efefef;
}
</style>