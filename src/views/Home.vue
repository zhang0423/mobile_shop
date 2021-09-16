<template>
  <div class="home">
    <div v-if="$route.path == '/home'">
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
        <van-swipe-item v-for="item in banner" :key="item.id">
          <img
            :src="item.image_url"
            alt=""
            width="100%"
            style="display: block"
          />
        </van-swipe-item>
      </van-swipe>
      <!-- 宫格 -->
      <van-grid :column-num="5" square>
        <van-grid-item
          v-for="item in channel"
          :key="item.id"
          :icon="item.icon_url"
          :text="item.name"
        />
      </van-grid>
      <!-- 品牌制造商直供 -->
      <div class="title">品牌制造商直供</div>
      <ul class="brand">
        <li v-for="item in brandList" :key="item.id">
          <img :src="item.pic_url" alt="" />
          <h4>{{ item.name }}</h4>
          <div>{{ item.floor_price | filterMoney }}</div>
        </li>
      </ul>
    </div>
    <div v-if="$route.path == '/home/prpop'">
      <!-- 搜索页面 -->
      <transition name="van-slide-right">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      /* 搜索框文本 */
      value: "",
      /* 轮播图 */
      banner: [],
      /* 组件 */
      channel: [],
      brandList: [],
    };
  },
  methods: {
    /* 获取首页信息 */
    async getHomeList() {
      const res = await this.$http.get("/index/index");
      if (res.errno == 0) {
        console.log(res.data);
        this.banner = res.data.banner;
        this.channel = res.data.channel;
        this.brandList = res.data.brandList;
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
.title {
  margin-top: 20px;
  background: #fff;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.brand {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 13px;
  li {
    width: 49%;
    position: relative;
    margin-bottom: 10px;
    img {
      width: 100%;
      display: block;
    }
    h4 {
      position: absolute;
      left: 10px;
      top: 0;
      line-height: 30px;
    }
    div {
      position: absolute;
      left: 10px;
      top: 30px;
      color: darkred;
      line-height: 30px;
    }
  }
}
</style>
