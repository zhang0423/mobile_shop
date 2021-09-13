<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item title="综合" disabled />
      <van-dropdown-item
        title="价格"
        v-model="value1"
        :options="option1"
        @change="priceVal"
      />
      <van-dropdown-item
        title="分类"
        v-model="value2"
        :options="filterCategory"
        @change="cateVal"
      />
    </van-dropdown-menu>
    <!-- 搜索提示 -->
    <van-empty
      v-if="goodsList.length == 0"
      image="search"
      description="您搜索的商品不存在！"
    />
    <product v-else :goodsList="goodsList" />
  </div>
</template>

<script>
import product from "./product.vue";
export default {
  props: ["filterCategory", "goodsList"],
  data() {
    return {
      value1: 0,
      value2: 0,
      option1: [
        { text: "价格从高到低", value: "desc" },
        { text: "价格从低到高", value: "asc" },
      ],
    };
  },
  computed: {},
  methods: {
    /* 分类点击转换 */
    cateVal(value) {
      this.$emit("cateVal", value);
    },
    /* 价格点击转换 */
    priceVal(value) {
      this.$emit("priceVal", value);
    },
  },
  created() {},
  mounted() {
    /* 遍历checked值，值为true的，显示 */
    this.filterCategory.map((val, index) => {
      if (val.checked) {
        this.value2 = val.value;
      }
    });
  },
  components: { product },
};
</script>
<style lang="less" scoped>
</style>