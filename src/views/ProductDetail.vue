<template>
  <div>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" indicator-color="white">
      <van-swipe-item v-for="item in gallery" :key="item.id">
        <img :src="item.img_url" width="100%" style="display: block" alt="" />
      </van-swipe-item>
    </van-swipe>
    <!-- 提示 -->
    <van-row style="text-align: center; line-height: 30px">
      <van-col span="8">
        <van-icon name="checked" color="darkred" />30天无忧退货
      </van-col>
      <van-col span="8"
        ><van-icon name="checked" color="darkred" /> 48小时快速退费</van-col
      >
      <van-col span="8">
        <van-icon name="checked" color="darkred" />满88元免邮费</van-col
      >
    </van-row>
    <!-- 展示区域 -->
    <div class="info">
      <h3>{{ info.name }}</h3>
      <p>{{ info.goods_brief }}</p>
      <div>{{ info.retail_price | filterMoney }}</div>
    </div>
    <van-cell class="cells" title="展示弹出层" is-link @click="show = true" />
    <!-- 商品参数 -->
    <div class="attribute">
      <h4>商品参数</h4>
      <ul>
        <li v-for="(item, index) in attribute" :key="index">
          <span>{{ item.name }}</span>
          <section class="van-ellipsis">{{ item.value }}</section>
        </li>
      </ul>
    </div>
    <!-- 商品信息 -->
    <div class="box" ref="box"></div>
    <!-- 常见问题 -->
    <div class="tetle">
      <span>常见问题</span>
    </div>
    <!--常见问题  -->
    <div class="issue">
      <ul>
        <li v-for="item in issue" :key="item.id">
          <h3>{{ item.question }}</h3>
          <p>{{ item.answer }}</p>
        </li>
      </ul>
    </div>
    <!-- 大家都在看 -->
    <div class="tetle">
      <span>大家都在看</span>
    </div>
    <product :goodsList="goodsList" />
    <!-- 商品导航 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        :badge="badge"
        @click="toCart"
      />
      <van-goods-action-icon
        :icon="isShow ? 'star' : 'star-o'"
        :text="isShow ? '已收藏' : '未收藏'"
        :color="isShow ? 'darkred' : '#666'"
        @click="isShow = !isShow"
      />
      <van-goods-action-button type="warning" text="加入购物车" @click="add" />
      <van-goods-action-button type="danger" text="立即购买" @click="qq" />
    </van-goods-action>
    <!-- 商品规格 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      ref="skuRef"
    />
  </div>
</template>

<script>
import product from "@/components/product";
export default {
  data() {
    return {
      /* 轮播图 */
      gallery: [],
      /* 商品信息 */
      info: {},
      /* 商品参数 */
      attribute: [],
      /* 常见问题 */
      issue: [],
      /* 相关产品 */
      goodsList: [],
      isShow: false,
      /* 展示弹出层 */
      show: false,
      sku: {
        tree: [],
        hide_stock: false,
        price: "",
        stock_num: "",
      },
      goods: {
        picture: "",
      },
      messageConfig: {
        // 数据结构见下方文档
      },
      /* 购物车商品数量 */
      badge: 0,
      productList: [],
    };
  },
  computed: {},
  methods: {
    /* 根据ID获取数据 */
    async getProductId() {
      const res = await this.$http.get("/goods/detail", {
        params: {
          id: this.$route.query.id,
        },
      });
      if (res.errno == 0) {
        console.log(res);
        this.gallery = res.data.gallery;
        this.info = res.data.info;
        this.attribute = res.data.attribute;
        this.$refs.box.innerHTML = res.data.info.goods_desc;
        this.issue = res.data.issue;
        this.goods.picture = res.data.info.list_pic_url;
        this.sku.price = res.data.info.retail_price.toFixed(2);
        this.sku.stock_num = res.data.info.goods_number;
        this.productList = res.data.productList;
      }
    },
    /* 获取相关产品数据 */
    async getGoodsList() {
      const res = await this.$http.get("/goods/related", {
        params: {
          id: this.$route.query.id,
        },
      });
      if (res.errno == 0) {
        this.goodsList = res.data.goodsList;
      }
      console.log(res);
    },
    /* 立即购买 */
    qq() {
      this.$toast("正在开发中");
    },
    /* 加入购物车 */
    async add() {
      if (this.show) {
        let token = localStorage.getItem("token");
        if (token !== "" && token) {
          const res = await this.$http.post("/cart/add", {
            goodsId: this.$route.query.id,
            productId: this.productList[0].id,
            number: this.$refs.skuRef.getSkuData().selectedNum,
          });
          if (res.errno == 0) {
            this.getCartNum();
            this.show = false;
            this.$toast.success("添加成功");
          }
        } else {
          this.$toast("请先登录");
          setTimeout(() => {
            this.$router.push("/User");
          }, 1500);
        }
      } else {
        this.show = true;
      }
    },
    /* 获取购物车数量 */
    async getCartNum() {
      const res = await this.$http.get("/cart/goodscount");
      console.log(res);
      if (res.errno == 0) {
        this.badge = res.data.cartTotal.goodsCount;
      }
    },
    /* 跳到购物车页面 */
    toCart() {
      this.$router.push("/Cart");
    },
  },
  created() {
    this.getProductId();
    this.getGoodsList();
    this.getCartNum();
  },
  mounted() {},
  components: { product },
};
</script>
<style lang="less" scoped>
.van-row {
  font-size: 12px;
}
.info {
  background: #fff;
  text-align: center;
  padding: 20px 0;
  h3 {
    font-weight: normal;
    font-size: 20px;
    line-height: 50px;
  }
  p {
    color: #999;
    font-size: 14px;
    line-height: 30px;
  }
  div {
    color: darkred;
    font-size: 14px;
    line-height: 30px;
  }
}
.cells {
  margin-bottom: 20px;
  border-top: 1px solid #ccc;
}
.attribute {
  background: #fff;
  padding: 20px 4%;
  h4 {
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 20px;
  }
  ul {
    li {
      background: #efefef;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      span {
        width: 25%;
        text-align: right;
      }
      section {
        flex: 1;
        padding-left: 10px;
      }
    }
  }
}
/* 深度修改样式 */
/deep/.box {
  img {
    width: 100%;
    display: block;
  }
}

.tetle {
  width: 100%;
  background: #fff;
  height: 50px;
  position: relative;
  &::after {
    content: "";
    width: 50%;
    height: 2px;
    background: #ccc;
    position: absolute;
    top: 50%;
    margin-top: -1px;
    left: 50%;
    margin-left: -25%;
  }
  span {
    background: #fff;
    width: 30%;
    display: block;
    position: relative;
    text-align: center;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    z-index: 2;
  }
}
.issue {
  padding: 0 4%;
  background: #fff;
  li {
    h3 {
      height: 30px;
      line-height: 30px;
      font-weight: normal;
      position: relative;
      padding-left: 20px;
      &::before {
        content: "";
        width: 4px;
        height: 4px;
        background: darkred;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 50%;
        margin-top: -2px;
      }
    }
    p {
      font-size: 12px;
      line-height: 20px;
      padding-left: 20px;
    }
  }
}
.van-goods-action {
  z-index: 9999;
}
</style>