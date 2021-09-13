<template>
  <div class="box">
    <!-- 搜索框 -->
    <van-search
      v-model="searchValue"
      show-action
      :placeholder="searchBox.keywords"
      @search="onSearch"
      @cancel="onCancel"
      @input="getsearch"
    />
    <!-- 历史记录模块 -->
    <history
      v-if="blockshow == 1"
      :historyKeywordList="searchBox.historyKeywordList"
      :hotKeywordList="searchBox.hotKeywordList"
      @tagClick="tagClick"
    />
    <!-- List模块 -->
    <dtList v-else-if="blockshow == 2" :arr="arr" @cellClick="tagClick" />
    <!-- 商品模块 -->
    <searchGoods1
      v-else
      :filterCategory="filterCategory"
      :goodsList="goodsList"
      @cateVal="cateVal"
      @priceVal="priceVal"
    />
  </div>
</template>

<script>
import history from "@/components/History";
import searchGoods1 from "@/components/searchGoods1";
import dtList from "@/components/dtList";
export default {
  data() {
    return {
      /* 搜索框 */
      searchBox: {
        keywords: "",
        historyKeywordList: [],
        hotKeywordList: [],
      },
      /* 要显示的组件 */
      blockshow: 1,
      /* 搜索框输入的值 */
      searchValue: "",
      filterCategory: [],
      goodsList: [],
      order: "desc",
      categoryId: 0,
      sort: "id",
      arr: [],
    };
  },
  computed: {},
  methods: {
    /* 获取历史搜索数据 */
    async getSearch() {
      const res = await this.$http.get("/search/index");
      console.log(res.data);
      if (res.errno == 0) {
        this.searchBox.keywords = res.data.defaultKeyword.keyword;
        this.searchBox.historyKeywordList = res.data.historyKeywordList;
        this.searchBox.hotKeywordList = res.data.hotKeywordList;
      }
    },
    /* 搜索框搜索事件 */
    async onSearch() {
      const res = await this.$http.get("/goods/list", {
        params: {
          keyword: this.searchValue,
          page: 1,
          size: 20,
          order: this.order,
          categoryId: this.categoryId,
          sort: this.sort,
        },
      });
      if (res.errno == 0) {
        this.blockshow = 3;
        let arr = JSON.parse(
          JSON.stringify(res.data.filterCategory)
            .replace(/name/g, "text")
            .replace(/id/g, "value")
        );
        this.goodsList = res.data.goodsList;
        this.filterCategory = arr;
        console.log(this.filterCategory);
      }
      console.log(res);
    },
    /* 搜索框取消事件 */
    onCancel() {
      this.$router.go(-1);
    },
    /* 更改分类的处理 */
    cateVal(val) {
      this.categoryId = val;
      this.onSearch();
    },
    /* 更改价格顺序的处理 */
    priceVal(val) {
      this.order = val;
      this.sort = "price";
      this.onSearch();
    },
    /* 实时搜索数据 */
    async getsearch() {
      const res = await this.$http.get("/search/helper", {
        params: { keyword: this.searchValue },
      });
      if (res.errno == 0) {
        console.log(res.data);
        this.blockshow = 2;
        this.arr = res.data;
      }
    },
    /* tag标签点击事件 */
    tagClick(val) {
      console.log(val);
      this.searchValue = val;
      this.onSearch();
    },
  },
  created() {
    this.getSearch();
  },
  mounted() {},
  components: {
    history,
    searchGoods1,
    dtList,
  },
};
</script>
<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background: #efefef;
}
</style>