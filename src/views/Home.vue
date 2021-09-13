<template>
  <div class="home">
    <!-- 顶部搜索框 -->
    <van-search
      v-model="value"
      shape="round"
      background="#4fc08d"
      placeholder="请输入搜索关键词"
      readonly
      @click="openSearch"
    />
    <!-- 首页轮播图 -->
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in homedata.banner" :key="item.id">
        <img :src="item.image_url" alt="" width="100%" style="display: block" />
      </van-swipe-item>
    </van-swipe>
    <!-- 搜索页面 -->
    <transition name="van-slide-right">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      value: "",
      homedata: {
        banner: [],
      },
    };
  },
  methods: {
    /* 获取首页信息 */
    async getHomeList() {
      const res = await this.$http.get("/index/index");
      if (res.errno == 0) {
        console.log(res.data);
        this.homedata.banner = res.data.banner;
      }
    },
    /* 点击搜索框页面 */
    openSearch() {
      this.$router.push("/home/prpop");
    },
  },
  created() {
    this.getHomeList();
  },
};
</script>
<style lang="less" scoped>
</style>
