<template>
  <div>
    <ul>
      <li v-for="item in goodsList" :key="item.id">
        <img
          :src="item.list_pic_url"
          alt=""
          width="100%"
          style="display: block"
        />
        <div class="van-ellipsis">{{ item.name }}</div>
        <div class="price">{{ item.retail_price }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["goodsList"],
  data() {
    return {};
  },
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
ul {
  padding: 10px 2%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  li {
    width: 49%;
    background: #fff;
    margin-bottom: 10px;
    text-align: center;
    line-height: 30px;
    .price {
      color: red;
    }
  }
}
</style>