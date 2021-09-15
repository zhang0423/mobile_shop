<template>
  <div>
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#666">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/topic" icon="label-o">专题</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    active: {
      get() {
        switch (this.$route.path) {
          case "/home":
            return 0;
          case "/topic":
            return 1;
          case "/category":
            return 2;
          case "/cart":
            return 3;
          case "/user":
            return 4;
          default:
            break;
        }
      },
      set() {},
    },
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>