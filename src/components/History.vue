<template>
  <div>
    <div class="history" v-if="showHistory">
      <div class="top">
        <h4>历史记录</h4>
        <van-icon name="delete-o" @click="clearFn" />
      </div>
      <div class="down">
        <van-tag
          plain
          @click="tagClick(item)"
          type="default"
          v-for="(item, index) in historyKeywordList"
          :key="index"
          >{{ item }}</van-tag
        >
      </div>
    </div>
    <div class="history">
      <div class="top">
        <h4>热门搜索</h4>
      </div>
      <div class="down">
        <van-tag
          @click="tagClick(item.keyword)"
          plain
          :type="item.is_hot == 1 ? 'danger' : 'default'"
          v-for="(item, index) in hotKeywordList"
          :key="index"
          >{{ item.keyword }}</van-tag
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["historyKeywordList", "hotKeywordList"],
  data() {
    return {
      showHistory: true,
    };
  },
  computed: {},
  methods: {
    async getHistoryHot() {
      const res = await this.$http.get("/search/index");
    },
    tagClick(item) {
      this.$emit("tagClick", item);
    },
    async clearFn() {
      const res = await this.$http.post("/search/clearhistory");
      if (res.errno == 0) {
        this.$toast.success("删除成功");
        this.showHistory = false;
      }
    },
  },
  created() {
    this.getHistoryHot();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.history {
  padding: 0 2%;
  background: #fff;
  margin-bottom: 20px;
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    font: 20px;
    h4 {
      font-weight: normal;
    }
  }
  .down {
    .van-tag {
      font-size: 14px;
      margin-right: 10px;
      margin-bottom: 10px;
      padding: 3px;
    }
  }
}
</style>