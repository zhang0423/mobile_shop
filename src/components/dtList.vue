<template>
  <div>
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell
        v-for="item in arr"
        :key="item"
        :title="item"
        @click="cellClick(item)"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  props: ["arr"],
  data() {
    return {
      finished: true,
    };
  },
  computed: {},
  methods: {
    cellClick(item) {
      this.$emit("cellClick", item);
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped>
</style>